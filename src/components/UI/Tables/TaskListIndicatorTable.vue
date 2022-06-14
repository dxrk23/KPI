<script>
import EmployeeService from '../../../services/employee.service';
import RequirementService from '../../../services/requirement.service';
import ReportPeriodService from '../../../services/report.period.service';
import AdminTaskListService from '../../../services/admin.tasklist.service';
import ProfileService from '../../../services/profile.service';
import UserUtil from '../../../utils/user.util';

const employeeService = new EmployeeService();
const requirementService = new RequirementService();
const periodService = new ReportPeriodService();
const adminTaskListService = new AdminTaskListService();
const profileService = new ProfileService();
export default {
  name: 'TaskListIndicatorTable',
  data() {
    return {
      activePeriod: {},
      requirements: [],

      employee: {},
    };
  },
  methods: {
    getRequirements() {
      if (UserUtil.isUserRoot()) {
        adminTaskListService
          .getAdminTaskListByEmployeeIdAndPeriodId(this.$route.params.employeeId, this.activePeriod.id)
          .then((response) => {
            this.requirements = response;
            this.getEmployee();
          });
      } else {
        profileService.getTasks(this.activePeriod.id).then((response) => {
          this.requirements = response;
          this.getEmployee();
        });
      }
    },
    getActivePeriod() {
      periodService
        .getPeriodActive()
        .then((response) => {
          this.activePeriod = response;
        })
        .then(() => {
          this.getRequirements();
        });
    },
    getEmployee() {
      profileService.getProfileByUserId(this.$route.params.employeeId).then((response) => {
        this.employee = response;
      });
    },
    goToUploadRequirement(requirementId) {
      this.$router.push(`/task/upload/${requirementId}/${this.employee.id}`);
    },
  },
  computed: {
    getEmployeeName() {
      return `${this.employee.name?.lastName} ${this.employee.name?.firstName} ${this.employee.name?.middleName} Task List`;
    },
  },
  created() {
    this.getActivePeriod();
  },
};
</script>

<template>
  <div class="--requirement-table">
    <div class="--title" v-html="getEmployeeName"></div>
    <table>
      <thead>
        <tr class="--row --table-head">
          <th class="--number-col">№</th>
          <th class="--name-table">Индикатор</th>
          <th class="--uploaded-column">Статус загрузки</th>
          <th class="--period-data">Вес</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(requirement, index) in requirements" :key="requirement.requirementId" class="--row">
          <td class="--index-data">{{ index + 1 }}</td>
          <td class="--indicator-name" @click="goToUploadRequirement(requirement.requirementId)">
            {{ requirement.indicatorName }}
          </td>
          <td class="--portion-data">{{ requirement.hasSubmission ? 'Uploaded' : '' }}</td>
          <td class="--grade-data">{{ requirement.grade ?? '...' }}/{{ requirement.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.--title {
  font-family: 'Inter', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;

  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.24px;
  font-feature-settings: 'tnum' on, 'lnum' on;

  color: #000000;
}

.--requirement-table {
  margin-top: 50px;
  width: 98%;

  padding-left: 50px;
}

table {
  width: inherit;
  height: inherit;

  margin-top: 20px;
}

.--index-data {
  font-family: 'Inter', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #232326;

  text-align: center;
  border: 1px solid #e3e3e3;
}

.--row {
  height: 35px;
  position: relative;

  border: 1px solid black;
}

.--table-head {
  background: #4e4e53;
  color: white;

  height: 50px;
}

.--grade-data {
  border: 1px solid #e3e3e3;
  text-align: center;
}

.--indicator-name,
.--period-data {
  text-align: start;
  border: 1px solid #e3e3e3;
}

.--indicator-name {
  padding-left: 20px;
  color: blue;
  cursor: pointer;
}

.--name-table {
  width: 65%;
}

.--period-data {
  text-align: center;
}

.--portion-data {
  text-align: center;
  border: 1px solid #e3e3e3;
}

.--uploaded-column {
}

.--number-col {
  width: 8%;
}
</style>
