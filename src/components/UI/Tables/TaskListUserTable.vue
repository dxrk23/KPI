<script>
import EmployeeService from '../../../services/employee.service';
import AdminTaskListService from '../../../services/admin.tasklist.service';
import ReportPeriodService from '../../../services/report.period.service';
import UserUtil from '../../../utils/user.util';
import ThePagination from '../Pagination/ThePagination.vue';

const employeeService = new EmployeeService();
const adminTaskListService = new AdminTaskListService();
const reportPeriodService = new ReportPeriodService();
export default {
  name: 'TaskListUserTable',
  components: { ThePagination },
  data() {
    return {
      employees: {},
      employeeItems: [],

      activePeriod: {},
    };
  },
  methods: {
    changePage(page) {
      adminTaskListService.getAdminTaskList(this.activePeriod.id, page).then((response) => {
        this.employee = response;
        this.employeeItems = response.items;
      });
    },
    getActivePeriod() {
      reportPeriodService
        .getPeriodActive()
        .then((period) => {
          this.activePeriod = period;
        })
        .then(() => {
          this.getInitialUsers();
        });
    },
    getInitialUsers() {
      adminTaskListService.getAdminTaskList(this.activePeriod.id).then((res) => {
        this.employees = res;
        this.employeeItems = res.items;
      });
    },
    getEmployeeFullName(item) {
      return `${item.employee.name.lastName} ${item.employee.name.firstName} ${item.employee.name.middleName ?? ''} ${
        item.specialtyId ? '' : '(Не выбрал специальность)'
      }`;
    },
    goToUser(positionId) {
      this.$router.push(`/task/requirements/${positionId}`);
    },
  },
  computed: {},
  created() {
    if (UserUtil.isUserRoot()) {
      this.getActivePeriod();
    }
  },
};
</script>

<template>
  <div class="--requirement-table">
    <table>
      <thead>
        <tr class="--row --table-head">
          <th class="--number-col">№</th>
          <th class="--name-table">Username</th>
          <th class="--uploaded-column">Uploaded</th>
          <th class="--period-data">Grade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in employeeItems" :key="item.employee.id" class="--row">
          <td class="--index-data">{{ index + 1 }}</td>
          <td class="--indicator-name" @click="goToUser(item.employee.id)">{{ getEmployeeFullName(item) }}</td>
          <td class="--portion-data">{{ item.submissionsCount }}/{{ item.requirementsCount }}</td>
          <td class="--grade-data">{{ item.totalGrade }}/{{ item.totalWeight }}</td>
        </tr>
      </tbody>
    </table>
    <the-pagination
      @onPageChage="changePage"
      :pages="{ totalPages: employees.totalPages, currentPage: employees.currentPage }"
    />
  </div>
</template>

<style scoped>
.--requirement-table {
  margin-top: 20px;
  width: 100%;
}

table {
  width: inherit;
  height: inherit;
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
