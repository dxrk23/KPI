<script>
import ReportPeriodItem from './ReportPeriodItem.vue';
import ReportPeriodPartService from "../../services/report.period.part.service";
import ReportPeriodService from "../../services/report.period.service";

const reportPeriodPartService = new ReportPeriodPartService();
const reportPeriodService = new ReportPeriodService();

export default {
  name: 'SelectPeriod',
  components: {ReportPeriodItem},
  data() {
    return {
      currentPage: 1,
      periodItems: [],

      activePeriod: null,
    };
  },
  methods: {
    // TODO - make infinite scroll / load button to load more periods
    getInitialPeriod() {
      reportPeriodService.getPeriodActive().then(response => {
        this.activePeriod = response;
      }).then(() => {
        reportPeriodPartService.getPeriodPartByPeriodId(this.activePeriod.id).then(response => {
          this.periodItems = response;
        });
      });
    },


  },
  mounted() {
    this.getInitialPeriod();
  },
};
</script>

<template>
  <div class="--select-period-main">
    <report-period-item v-for="item in periodItems" :key="item.id" :period="item"></report-period-item>
  </div>
</template>

<style scoped>
.--select-period-main {
  width: 90%;
  height: 100%;

  margin: auto;
}
</style>
