<script>
import ReportPeriodService from '../../services/report.period.service';
import ReportPeriodItem from './ReportPeriodItem.vue';

const reportPeriodService = new ReportPeriodService();
export default {
  name: 'SelectPeriod',
  components: { ReportPeriodItem },
  data() {
    return {
      currentPage: 1,
      periodItems: [],
    };
  },
  methods: {
    // TODO - make infinite scroll / load button to load more periods
    getInitialPeriod() {
      reportPeriodService.getReportingPeriods(this.currentPage).then((response) => {
        this.periodItems = response.items;
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
