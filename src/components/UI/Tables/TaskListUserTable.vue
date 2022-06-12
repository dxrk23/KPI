<script>
import EmployeeService from "../../../services/employee.service";
import AdminTaskListService from "../../../services/admin.tasklist.service";

const employeeService = new EmployeeService();
const adminTaskListService = new AdminTaskListService();
export default {
  name: "TaskListUserTable",
  data() {
    return {
      employees: {},
      employeeItems: [],
    }
  },
  methods: {
    getInitialUsers() {
      adminTaskListService.getAdminTaskList().then((res) => {
        this.employees = res;
        this.employeeItems = res.items;
      });
    },
    getEmployeeFullName(employee) {
      return `${employee.name.lastName} ${employee.name.firstName} ${employee.name.middleName ?? ''}  (${employee.specialtyId ?? 'Не выбрал специальность'})`;
    },
    goToUser(positionId) {
      this.$router.push(`/task/requirements/${positionId}`);
    }
  },
  computed: {},
  mounted() {
    this.getInitialUsers();
  }
}
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
        <td class="--indicator-name" @click="goToUser(item.employee.id)"> {{ getEmployeeFullName(item.employee) }}</td>
        <td class="--portion-data">{{ item.submissionsCount }}/{{ item.requirementsCount }}</td>
        <td class="--grade-data">{{ item.totalGrade }}/{{ item.totalWeight }}</td>
      </tr>
      </tbody>
    </table>
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
  background: #4E4E53;
  color: white;

  height: 50px;
}

.--grade-data {
  border: 1px solid #e3e3e3;
  text-align: center;
}

.--indicator-name, .--period-data {
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