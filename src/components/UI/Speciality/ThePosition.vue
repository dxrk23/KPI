<template>
  <div class="--wrapper">
    <div class="--main-position">
      <div class="--title">
        <span>{{ position.index + 1}}. </span>
        <span class="--title-input" spellcheck="false" contenteditable="true" v-html="position.name" @input="updatePositionName($event.target.innerHTML)"></span>
      </div>
      <div class="--modification-buttons">
        <div class="--delete">
          <span class="material-icons" @click="deletePosition">delete</span>
        </div>
        <div class="--update">
          <span class="material-icons" @click="updatePosition">save</span>
        </div>
      </div>
      <div class="--add-speciality">
        <submit-button class="--add-speciality-button" @click="addSpeciality()">Добавить специальность</submit-button>
      </div>
      <div class="--show">
        <button class="--show-button" @click="toggleDropdown">{{ isDropdownShow ? 'Скрыть' : 'Показать' }}</button>
      </div>
    </div>

    <div class="--dropdown-main" v-if="isDropdownShow">
      <the-speciality @onSpecialityDelete="deleteSpeciality" v-for="(speciality, index) in specialities" :speciality="{index, ...speciality}" :key="speciality.id"></the-speciality>
    </div>
  </div>
</template>

<script>
import SubmitButton from "../Buttons/SubmitButton.vue";
import TheSpeciality from "./TheSpeciality.vue";
import SpecialityService from "../../../services/speciality.service";
import PositionService from "../../../services/position.service";

const specialityService = new SpecialityService();
const positionService = new PositionService();

//TODO : Add animation for dropdown
//TODO : Save visible only if we changed title
//TODO : Make validation for position and speciality title

export default {
  name: "ThePosition",
  components: {SubmitButton, TheSpeciality},
  data() {
    return {
      isDropdownShow : false,
      specialities : null,
      positionName: null,
    }
  },
  props: {
    position: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleDropdown(){
      this.isDropdownShow = !this.isDropdownShow;
    },
    deleteSpeciality(id){
      specialityService.deleteSpeciality(id).then(() => {
        this.getSpecialities();
      });
    },
    deletePosition(){
      this.$emit('onDeletePosition', this.position.id)
    },
    getSpecialities(){
      specialityService.getSpecialitiesOfPosition(this.position.id).then((res) => {
        this.specialities = res;
      });
    },
    updatePositionName(str){
      this.positionName = str;
    },
    updatePosition(){
      positionService.updatePosition(this.position.id, {
        name : this.positionName
      })
    },
    addSpeciality(){
      specialityService.createSpeciality({
        "name": "Unnamed",
        "description": "Please edit...",
        "positionId": this.position.id
      }).then((res) => {
        this.specialities.push(res);
      })
    },
    isStringSame(str1, str2){
      return str1 === str2
    }
  },
  mounted() {
    this.getSpecialities();
  }
}
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

.--title-input{
  outline: none;
}


.--modification-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-left: 30px;

  height: 100%;
}

.--delete, .--update{
  display: flex;
  align-items: center;
  cursor: pointer;
}

.--delete:hover, .--update:hover {
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

.--dropdown-main {
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  transition: height .5s linear;

  background: #F0F0F1;
}
</style>