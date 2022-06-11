<script>
import IndicatorTable from "./UI/Tables/IndicatorTable.vue";
import IndicatorService from "../services/indicator.service";

const indicatorService = new IndicatorService();

export default {
  name: "TheIndicators",
  components: {IndicatorTable},
  data() {
    return {
      indicators: null,
      indicatorItems: [],
    }
  },
  methods: {
    loadInitialIndicators() {
      indicatorService.getIndicators().then((res) => {
        this.indicators = res;
      }).then(() => {
        this.getIndicatorItems();
      });
    },
    getIndicatorItems() {
      this.indicatorItems = this.indicators.items;
    },
    deleteIndicator(indicator) {
      indicatorService.deleteIndicator(indicator.id).then(() => {
        this.loadInitialIndicators();
      })
    }
  },
  created() {
    this.loadInitialIndicators();
  },
}
</script>

<template>
  <div class="--indicators-main">
    <div class="--title">Indicators</div>
    <div class="--content">
      <indicator-table :indicatorRows="indicatorItems" @onIndicatorDelete="deleteIndicator"></indicator-table>
    </div>
  </div>
</template>


<style scoped>
.--indicators-main {
  width: 100%;
  height: 100%;
}

.--title {
  margin-left: 41px;
  margin-top: 76px;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: #000000;
}

.--content {
  width: 973px;

  padding-top: 38px;
  padding-left: 35px;
}


</style>