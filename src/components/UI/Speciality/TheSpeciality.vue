<template>
  <div class="--main-speciality">
    <div class="--title">
      <span> {{ speciality.index + 1 }}. </span>
      <span
        :contenteditable="isUserRoot"
        class="--title-input"
        spellcheck="false"
        v-html="speciality.name"
        @input="updateSpecialityName($event.target.innerHTML)"
      ></span>
    </div>
    <div class="--modification-buttons">
      <div v-if="isUserRoot" class="--delete" @click="deleteSpeciality">
        <span class="material-icons">delete</span>
      </div>
      <div v-if="isUserRoot" class="--update" @click="updateSpeciality">
        <span class="material-icons">save</span>
      </div>
    </div>
    <div class="--add-speciality">
      <span v-if="!isUserRoot" class="material-icons --submit-speciality" @click="chooseSpecialty">check</span>
      <submit-button class="--add-speciality-button" @click="goToIndicator">Показать индикаторы</submit-button>
    </div>
  </div>
</template>

<script>
import SubmitButton from '../Buttons/SubmitButton.vue';
import SpecialityService from '../../../services/speciality.service';
import ProfileService from '../../../services/profile.service';
import UserUtil from '../../../utils/user.util';
import ReportPeriodService from '../../../services/report.period.service';

const specialityService = new SpecialityService();
const profileService = new ProfileService();
const reportPeriodService = new ReportPeriodService();
export default {
  name: 'TheSpeciality',
  components: { SubmitButton },
  data() {
    return {
      specialityName: '',
      period: {},
    };
  },
  props: {
    speciality: {
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
    chooseSpecialty() {
      profileService
        .setSpecialty({
          specialtyId: this.speciality.id,
          periodId: this.period.id,
        })
        .then(() => {
          this.$router.go();
        });
    },
    deleteSpeciality() {
      this.$emit('onSpecialityDelete', this.speciality.id);
    },
    updateSpecialityName(str) {
      this.specialityName = str;
    },
    updateSpeciality() {
      specialityService.updateSpeciality(this.speciality.id, {
        name: this.specialityName,
        description: this.speciality.description,
        positionId: this.speciality.positionId,
      });
    },
    goToIndicator() {
      this.$router.push('/speciality/indicators/' + this.speciality.id);
    },
    getActivePeriodId() {
      reportPeriodService.getPeriodActive().then((period) => {
        this.period = period;
      });
    },
  },
  mounted() {
    this.specialityName = this.speciality.name;
  },
  created() {
    this.getActivePeriodId();
  },
};
</script>

<style scoped>
.--main-speciality {
  width: 85%;
  min-height: 60px;

  border: 1px solid #e6e6e6;

  margin-top: 10px;

  display: flex;
  align-items: center;

  position: relative;

  background: #ffffff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  margin-bottom: 10px;

  padding-bottom: 10px;
  padding-top: 10px;
}

.--title {
  margin-left: 20px;
  width: 45%;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
}

.--title-input {
  outline: none;
  width: 100%;
  word-break: break-word;
}

.--modification-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-left: 30px;
}

.--delete,
.--update {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.--delete:hover,
.--update:hover,
.--submit-speciality:hover {
  opacity: 0.8;
}

.--add-speciality {
  width: 30%;
  height: 40px;

  position: absolute;
  right: 3%;

  display: flex;
  align-items: center;
}

.--submit-speciality {
  height: 24px;
  width: 28px;

  display: flex;
  align-items: center;
  margin-right: 3%;

  font-weight: bold;

  cursor: pointer;
}

.--add-speciality-button {
  width: 100%;
  height: 40px;

  color: black;
  background: rgba(51, 168, 213, 0.47);
  border-radius: 6px;
}
</style>
