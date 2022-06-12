<script>
import EmployeeService from "../../../services/employee.service";
import RequirementService from "../../../services/requirement.service";
import ReportPeriodService from "../../../services/report.period.service";

const employeeService = new EmployeeService();
const requirementService = new RequirementService();
const periodService = new ReportPeriodService();
export default {
  name: "TaskListIndicatorTable",
  data() {
    return {}
  },
  methods: {
    getRequirements() {

    }
  },
  computed: {},
  created() {

  }
}
</script>

<template>
  <div class="--requirement-table">
    <div class="--title">{{ }}</div>
    <table>
      <thead>
      <tr class="--row --table-head">
        <th class="--number-col">№</th>
        <th class="--name-table">Name of KPI</th>
        <th class="--uploaded-column">Uploaded</th>
        <th class="--period-data">Portion</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(employee, index) in employeeItems" :key="employee.id" class="--row">
        <td class="--index-data">{{ index + 1 }}</td>
        <td class="--indicator-name"></td>
        <td class="--portion-data"></td>
        <td class="--grade-data"></td>
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
  background: #4E4E53;
  color: white;

  height: 50px;
}

.--grade-data {
  border: 1px solid #e3e3e3;
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