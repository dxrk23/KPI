<script>
import RequirementService from "../../../services/requirement.service";
import ReportPeriodService from "../../../services/report.period.service";
import IndicatorService from "../../../services/indicator.service";
import ReportPeriodPartService from "../../../services/report.period.part.service";

const requirementService = new RequirementService();
const periodService = new ReportPeriodService();
const periodPartService = new ReportPeriodPartService();
const indicatorService = new IndicatorService();

// TODO: Finish table data visualization

export default {
  name: "SpecialityIndicatorTable",
  data() {
    return {
      indicators: [],
      requirements: [],
      activePeriod: {},

      specialityId: this.$route.params.specialityId,
    }
  },
  methods: {
    getActivePeriod() {
      periodService.getPeriodActive().then((res) => {
        this.activePeriod = res;
        this.getRequirements();
      })
    },
    getRequirements() {
      requirementService.getRequirementBySpecialityAndPeriodId(this.specialityId, this.activePeriod.id).then((res) => {
        this.requirements = res;
      })
    },
  },
  mounted() {
    this.getActivePeriod();
  }
}
</script>

<template>
  <div class="--requirement-table">
    <table>
      <thead>
      <tr class="--row --table-head">
        <th class="--number-col">№</th>
        <th>Name of KPI</th>
        <th class="--number-col">Portion</th>
        <th>Period</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(requirement, index) in requirements" :key="requirement.id" class="--row">
        <td class="--index-data">{{ index + 1 }}</td>
        <td class="--indicator-name">{{ requirement.indicatorName }}</td>
        <td class="--portion-data">{{ requirement.weight }}</td>
        <td class="--period-data">{{ requirement.periodPartName }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

.--requirement-table {
  margin-top: 20px;
  width: 95%;
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

.--indicator-name {
  text-align: start;
  padding-left: 20px;
  border: 1px solid #e3e3e3;
}

.--portion-data {
  text-align: center;
  border: 1px solid #e3e3e3;
}

.--period-data {
  width: 20%;
  border: 1px solid #e3e3e3;
  text-align: center;
}

.--number-col {
  width: 8%;
}
</style>