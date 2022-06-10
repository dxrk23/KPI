<script>
import SubmitButton from "./UI/Buttons/SubmitButton.vue";
import TheSpeciality from "./UI/Speciality/ThePosition.vue";
import ThePosition from "./UI/Speciality/ThePosition.vue";
import SpecialityService from "../services/speciality.service";
import PositionService from "../services/position.service";

const specialityService = new SpecialityService();
const positionService = new PositionService();

export default {
  name: "TheSpecialities",
  components: {ThePosition, SubmitButton},
  data() {
    return {
      positions : [],
      positionItems : [],
    }
  },
  methods: {
    getInitialPositions(){
      positionService.getPositionsPage().then(response => {
        this.positions = response;
        this.positionItems = this.positions.items;
      });
    },
    addSpeciality(){

    }
  },

  mounted(){
    this.getInitialPositions();
  }
}
</script>

<template>
  <div class="--speciality-main">
    <div class="--title"><span>Specialties</span><submit-button class="--submit-button" @click="addSpeciality">Добавить позицию</submit-button></div>
    <div class="--content">
      <the-position v-for="(position, index) in positionItems" :key="position.id" :position="{index, ...position}"></the-position>
    </div>
  </div>
</template>

<style scoped>
.--speciality-main{
  width: 100%;

  padding-left: 41px;
  padding-top: 75px;
}

.--title {
  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: #000000;

  display: flex;
  align-items: center;
}

.--submit-button {
  width: 274px;
  height: 40px;

  margin-left: 30px;
}

.--content {
  width: 100%;
  height: auto;

  margin-top: 20px;
}
</style>