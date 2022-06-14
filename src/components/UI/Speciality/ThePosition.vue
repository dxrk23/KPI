<template>
  <div class="--wrapper">
    <div class="--main-position">
      <div class="--title">
        <span>{{ position.index + 1 }}. </span>
        <span
          :contenteditable="isUserRoot"
          class="--title-input"
          spellcheck="false"
          @input="updatePositionName($event.target.innerHTML)"
          v-html="position.name"
        ></span>
      </div>
      <div class="--modification-buttons">
        <div class="--delete">
          <span v-if="isUserRoot" class="material-icons" @click="deletePosition">delete</span>
        </div>
        <div class="--update">
          <span v-if="isUserRoot" class="material-icons" @click="updatePosition">save</span>
        </div>
      </div>
      <div v-if="isUserRoot" class="--add-speciality">
        <submit-button class="--add-speciality-button" @click="addSpeciality()">Добавить специальность</submit-button>
      </div>
      <div class="--show">
        <submit-button class="--show-button" @click="toggleDropdown">{{
          isDropdownShow ? 'Скрыть' : 'Показать'
        }}</submit-button>
      </div>
    </div>

    <div
      v-if="isDropdownShow"
      :class="{ '--untouchable': !canUserChangeSpeciality && !isUserRoot }"
      class="--dropdown-main"
    >
      <the-speciality
        v-for="(speciality, index) in specialities"
        :key="speciality.id"
        :class="{ '--chosen-speciality': speciality.id === chosenSpeciality?.id }"
        :speciality="{ index, ...speciality }"
        @onSpecialityDelete="deleteSpeciality"
      ></the-speciality>
    </div>
  </div>
</template>

<script>
import SubmitButton from '../Buttons/SubmitButton.vue';
import TheSpeciality from './TheSpeciality.vue';
import SpecialityService from '../../../services/speciality.service';
import PositionService from '../../../services/position.service';
import UserUtil from '../../../utils/user.util';
import ReportPeriodService from '../../../services/report.period.service';
import ProfileService from '../../../services/profile.service';

const specialityService = new SpecialityService();
const positionService = new PositionService();
const profileService = new ProfileService();
const reportPeriodService = new ReportPeriodService();

//TODO : Add animation for dropdown
//TODO : Save visible only if we changed title
//TODO : Make validation for position and speciality title

export default {
  name: 'ThePosition',
  components: { SubmitButton, TheSpeciality },
  data() {
    return {
      isDropdownShow: false,
      specialities: null,
      positionName: null,

      activePeriod: {},
      chosenSpeciality: {},

      canUserChangeSpeciality: false,
    };
  },
  props: {
    position: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isUserRoot() {
      return UserUtil.isUserRoot();
    },
  },
  methods: {
    getActivePeriod() {
      reportPeriodService
        .getPeriodActive()
        .then((period) => {
          this.activePeriod = period;
        })
        .then(() => {
          this.getUserSpecialty();
        });
    },
    getUserSpecialty() {
      profileService
        .getSpecialtyByPeriod(this.activePeriod.id)
        .then((speciality) => {
          this.chosenSpeciality = speciality;
        })
        .then(() => {
          profileService.canUserChangeSpecialty(this.activePeriod.id).then((canUserChangeSpeciality) => {
            this.canUserChangeSpeciality = canUserChangeSpeciality;
          });
        });
    },
    toggleDropdown() {
      this.isDropdownShow = !this.isDropdownShow;
    },
    deleteSpeciality(id) {
      specialityService.deleteSpeciality(id).then(() => {
        this.getSpecialities();
      });
    },
    deletePosition() {
      this.$emit('onDeletePosition', this.position.id);
    },
    getSpecialities() {
      specialityService.getSpecialitiesOfPosition(this.position.id).then((res) => {
        this.specialities = res;
      });
    },
    updatePositionName(str) {
      this.positionName = str;
    },
    updatePosition() {
      positionService.updatePosition(this.position.id, {
        name: this.positionName,
      });
    },
    addSpeciality() {
      specialityService
        .createSpeciality({
          name: 'Unnamed',
          description: 'Please edit...',
          positionId: this.position.id,
        })
        .then((res) => {
          this.specialities.push(res);
        });
    },
    isStringSame(str1, str2) {
      return str1 === str2;
    },
  },
  mounted() {
    this.getSpecialities();
    if (!this.isUserRoot) {
      this.isDropdownShow = true;
      this.getActivePeriod();
    }
  },
};
</script>

<style scoped>
.--main-position {
  width: 90%;
  height: 53px;

  border: 1px solid #e6e6e6;

  margin-top: 10px;

  display: flex;
  align-items: center;

  position: relative;
}

.--wrapper {
  width: 100%;
  position: relative;
}

.--untouchable {
  pointer-events: none;
  cursor: not-allowed;
}

.--title {
  margin-left: 20px;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;

  text-decoration: none;

  display: flex;
  align-items: center;
}

.--title-input {
  outline: none;
}

.--chosen-speciality {
  border: 2px solid green;
}

.--modification-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-left: 30px;

  height: 100%;
}

.--delete,
.--update {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.--delete:hover,
.--update:hover {
  opacity: 0.8;
}

.--add-speciality {
  width: 30%;
  height: 40px;

  position: absolute;
  right: 17%;
}

.--add-speciality-button {
  width: 100%;
  height: 40px;

  color: black;
  background: rgba(51, 168, 213, 0.47);
  border-radius: 6px;
}

.--show {
  width: 15%;
  height: 40px;

  position: absolute;
  right: 10px;
}

.--show-button {
  width: 100%;
  height: 40px;

  background: rgba(64, 213, 51, 0.33);
  border-radius: 6px;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;

  cursor: pointer;
}

.--show-button:hover {
  opacity: 0.8;
  background: rgba(64, 213, 51, 0.33);
}

.--dropdown-main {
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  transition: height 0.5s linear;

  background: #f0f0f1;
}
</style>
