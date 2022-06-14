<script>
import SubmitButton from './UI/Buttons/SubmitButton.vue';
import ThePosition from './UI/Speciality/ThePosition.vue';
import SpecialityService from '../services/speciality.service';
import PositionService from '../services/position.service';
import UserUtil from '../utils/user.util';
import ThePagination from './UI/Pagination/ThePagination.vue';

const specialityService = new SpecialityService();
const positionService = new PositionService();

export default {
  name: 'TheSpecialities',
  components: { ThePagination, ThePosition, SubmitButton },
  data() {
    return {
      positions: [],
      positionItems: [],
    };
  },
  computed: {
    isUserRoot() {
      return UserUtil.isUserRoot();
    },
  },
  methods: {
    getInitialPositions() {
      positionService.getPositionsPage().then((response) => {
        this.positions = response;
        this.positionItems = this.positions.items;
      });
    },
    addPosition() {
      positionService
        .createPosition({
          name: 'Unnamed',
        })
        .then((res) => {
          this.positionItems.push(res);
        });
    },
    deletePosition(id) {
      positionService.deletePosition(id).then((res) => {
        this.getInitialPositions();
      });
    },
    getUserPosition() {
      positionService.getPositionById(UserUtil.getUserPositionId()).then((res) => {
        this.positionItems = [res];
      });
    },
  },

  mounted() {
    if (this.isUserRoot) {
      this.getInitialPositions();
    } else {
      this.getUserPosition();
    }
  },
};
</script>

<template>
  <div class="--speciality-main">
    <div class="--title">
      <span>Specialties</span>
      <submit-button v-if="isUserRoot" class="--submit-button" @click="addPosition">Добавить позицию</submit-button>
    </div>
    <div class="--content">
      <the-position
        @onDeletePosition="deletePosition"
        v-for="(position, index) in positionItems"
        :key="position.id"
        :position="{ index, ...position }"
      ></the-position>
      <the-pagination :pages="{ totalPages: positions.totalPages, currentPage: positions.currentPage }" />
    </div>
  </div>
</template>

<style scoped>
.--speciality-main {
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
  width: 20%;
  height: 40px;

  margin-left: 30px;
}

.--content {
  width: 100%;
  height: auto;

  margin-top: 20px;
}
</style>
