<script>
import SpecialityService from '../../../services/speciality.service';
import PositionService from '../../../services/position.service';
import SubmitButton from '../Buttons/SubmitButton.vue';
import SpecialityIndicatorTable from '../Tables/SpecialityIndicatorTable.vue';
import UserUtil from "../../../utils/user.util";

const specialityService = new SpecialityService();
const positionService = new PositionService();
export default {
  name: 'TheSpecialityIndicator',
  components: { SpecialityIndicatorTable, SubmitButton },
  data() {
    return {
      speciality: {},
      position: {},
    };
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
      });
    },
    goToLinkIndicator() {
      this.$router.push('/speciality/createRequirement/' + this.speciality.id);
    },
    getTitle() {
      return `Specialities > ${this.position.name} > ${this.speciality.name}`;
    },
  },

  computed: {
    isUserRoot() {
      return UserUtil.isUserRoot();
    },
  },

  created() {
    this.loadInitialData();
  },
};
</script>

<template>
  <div class="--speciality-indicator-main">
    <div class="--title">
      {{ getTitle() }}
    </div>
    <div class="--content">
      <submit-button v-if="isUserRoot" class="--link-button" @click="goToLinkIndicator">Связать индикторы
      </submit-button>
      <speciality-indicator-table></speciality-indicator-table>
    </div>
  </div>
</template>

<style scoped>
.--speciality-indicator-main {
  padding-left: 41px;
  padding-top: 76px;
}

.--title {
  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: #000000;
}

.--link-button {
  margin-top: 27px;
  width: 20%;
}
</style>
