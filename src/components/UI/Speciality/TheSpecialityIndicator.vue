<script>
import SpecialityService from "../../../services/speciality.service";
import PositionService from "../../../services/position.service";

const specialityService = new SpecialityService();
const positionService = new PositionService();
export default {
  name: "TheSpecialityIndicator",
  data() {
    return {
      speciality: null,
      position: null
    }
  },

  methods: {
    loadInitialData() {
      specialityService.getSpecialitiesById(this.$route.params.specialityId).then((res) => {
        this.speciality = res;
        this.getPosition();
      });
    },
    getPosition() {
      positionService.getPositionById(this.speciality.positionId).then((res) => {
        this.position = res;
      })
    }
  },

  mounted() {
    this.loadInitialData();
  }

}
</script>

<template>
  <div class="--speciality-indicator-main">
    <div class="--title"></div>
    <div class="--content"></div>
  </div>
</template>

<style scoped>

</style>