<script>
import SpecialityService from "../../../services/speciality.service";
import PositionService from "../../../services/position.service";
import ReportPeriodService from "../../../services/report.period.service";
import ReportPeriodPartService from "../../../services/report.period.part.service";
import IndicatorService from "../../../services/indicator.service";
import RequirementService from "../../../services/requirement.service";

import SubmitButton from "../Buttons/SubmitButton.vue";
import PeriodDropdown from "../Dropdowns/PeriodDropdown.vue";
import Dropdown from "../Dropdowns/Dropdown.vue";
import IndicatorDropdown from "../Dropdowns/IndicatorDropdown.vue";

const specialityService = new SpecialityService();
const positionService = new PositionService();
const periodService = new ReportPeriodService();
const periodPartService = new ReportPeriodPartService();
const indicatorService = new IndicatorService();
const requirementService = new RequirementService();

export default {
  name: "CreateRequirement",
  components: {Dropdown, PeriodDropdown, IndicatorDropdown, SubmitButton},
  data() {
    return {
      speciality: {},
      position: {},

      activePeriod: {},
      periodParts: [],
      selectedPeriodPart: {},

      indicators: [],
      indicatorWeight: 0,
      selectedIndicator: {},

      note: '',
    }
  },

  methods: {
    loadInitialData() {
      specialityService.getSpecialitiesById(this.$route.params.specialityId).then((res) => {
        this.speciality = res;
        this.getPosition();
        this.getActivePeriod();
      });
    },
    getPosition() {
      positionService.getPositionById(this.speciality.positionId).then((res) => {
        this.position = res;
      }).then(() => {
        this.getIndicators();
      });
    },
    goToLinkIndicator() {
      this.$router.push('/speciality/createRequirement/' + this.speciality.id);
    },
    getActivePeriod() {
      periodService.getPeriodActive().then((res) => {
        this.activePeriod = res;
      }).then(() => {
        this.getPeriodParts();
      });
    },
    getPeriodParts() {
      periodPartService.getPeriodPartByPeriodId(this.activePeriod.id).then((res) => {
        this.periodParts = res;
      })
    },
    onPeriodSelect(period) {
      this.selectedPeriodPart = period;
    },
    onIndicatorSelect(indicator) {
      this.selectedIndicator = indicator;
    },
    getIndicators() {
      indicatorService.getIndicators().then((res) => {
        this.indicators = res;
      });
    },
    updateNote(str) {
      this.note = str;
    },
    addRequirement() {
      let requirement = {
        specialtyId: this.speciality.id,
        periodPartId: this.selectedPeriodPart.id,
        indicatorId: this.selectedIndicator.id,
        weight: +this.indicatorWeight,
        note: this.note,
      };

      requirementService.createRequirement(requirement).then((res) => {
        console.log(res)
        this.$router.push('/speciality/indicators/' + this.speciality.id);
      });
    }
  },
  computed: {
    getTitle() {
      return `Specialities > ${this.position.name} > ${this.speciality.name}`;
    }
  },
  created() {
    this.loadInitialData();
  }
}
</script>

<template>
  <div class="--create-requirement-main">
    <div class="--title">
      {{ getTitle }}
    </div>

    <div class="--content">
      <div class="--period-selector-main">
        <div class="--period-selector-title">
          Отношение (к текущему периоду - {{ activePeriod.name }})
        </div>
        <div class="--period-selector-dropdown">
          <period-dropdown :periodParts="periodParts" @select="onPeriodSelect"></period-dropdown>
        </div>
      </div>

      <div class="--indicator-selector-main">
        <div class="--indicator-selector-title">
          Выбрать индикатор
        </div>
        <div class="--indicator-selector-dropdown">
          <indicator-dropdown :indicators="indicators" @select="onIndicatorSelect"></indicator-dropdown>
        </div>
      </div>

      <div class="--weight-selector-main">
        <div class="--weight-selector-title">
          Вес индикатора
        </div>
        <div class="--weight-selector-input">
          <input v-model="indicatorWeight" class="--weight-input" type="number">
        </div>
      </div>

      <div class="--note-main">
        <div class="--note-title">Примечание к индикатору</div>
        <div class="--note-input" contenteditable="true" @input="updateNote($event.target.innerHTML)"></div>
      </div>

      <submit-button style="margin-top: 20px;" @click="addRequirement">Save</submit-button>
    </div>
  </div>
</template>

<style scoped>
.--create-requirement-main {
  width: 100%;
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

.--content {
  margin-top: 88px;
}

.--period-selector-main, .--indicator-selector-main, .--weight-selector-main {
  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
}

.--period-selector-dropdown, .--indicator-selector-dropdown {
  width: 38%;
  height: 50px;

  margin-top: 20px;
}

.--note-input {
  width: 38%;
  min-height: 50px;

  border: 1px solid black;
  margin-top: 25px;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;

  padding: 10px;
}

.--note-main {
  margin-top: 25px;
}

.--note-title {
  margin-top: 20px;
  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
}

.--weight-selector-input {
  width: 7%;
  height: 50px;
  margin-top: 20px;
}

.--indicator-selector-main, .--weight-selector-main {
  margin-top: 25px;
}

.--weight-input {
  height: 100%;
  width: 100%;

  display: flex;
  text-align: center;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

</style>