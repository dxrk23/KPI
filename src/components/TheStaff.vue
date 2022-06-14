<script>
import EmployeeService from '../services/employee.service'
import ReportPeriodService from '../services/report.period.service';

import ThePagination from './UI/Pagination/ThePagination.vue';
import StaffUserTable from './UI/Tables/StaffUserTable.vue';

const employeeService = new EmployeeService();
const periodService = new ReportPeriodService();

export default {
  name: "TheStaff",
  components: { ThePagination, StaffUserTable },
  data() {
    return {
      employees: []
    };
  },

  methods: {
    loadEmployees() {
      employeeService
        .getEmployees()
        .then(employees => {
          this.employees = employees;
        })
        .catch(e => {
          this.$swal({
            title: "Ошибка",
            text: e.message,
            icon: "error"
          });
        });
    },

    allowSpecialtyChange(employee) {
      console.log('S');
      periodService
        .getPeriodActive()
        .then(period => employeeService.allowSpecialtyChange(employee.id, period.id))
        .then(() => {
          this.$swal({
            title: "Успешно",
            text: "Разрешено менять специальность",
            icon: "success"
          });
        })
        .catch(e => {
          this.$swal({
            title: "Ошибка",
            text: e.message,
            icon: "error"
          });
        });
    },

    changePage(pageNumber) {
      employeeService
        .getEmployees(pageNumber)
        .then((res) => {
          this.employees = res;
        });
    },

    resetPassword(employee) {
      employeeService
        .resetPassword(employee.id)
        .then(() => {
          this.$swal({
            title: "Успешно",
            text: "Пароль был сброшен",
            icon: "success"
          });
        })
        .catch(e => {
          this.$swal({
            title: "Ошибка",
            text: e.message,
            icon: "error"
          });
        });
    },
  },

  created() {
    this.loadEmployees();
  },
}
</script>

<template>
  <div class="--staff-main">
    <div class="--title">Сотрудники</div>
    <div class="--content">
      <staff-user-table
        :page="+employees.currentPage"
        :rows="employees.items"
        @onResetPassword="resetPassword"
        @onSpecialtyChange="allowSpecialtyChange"
      ></staff-user-table>
      <ThePagination
        @onPageChange="changePage"
        :pages="{ totalPages: employees.totalPages, currentPage: employees.currentPage }"
      ></ThePagination>
    </div>
  </div>
</template>

<style scoped>
.--title {
  margin-left: 41px;
  margin-top: 42px;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: #000000;
}

.--content {
  width: 95%;

  padding-top: 38px;
  padding-left: 35px;
}
</style>