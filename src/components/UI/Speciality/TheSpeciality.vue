<template>
  <div class="--main-speciality">
    <div class="--title">
      <span> {{ speciality.index + 1 }}. </span>
      <span class="--title-input" spellcheck="false" contenteditable="true" v-html="speciality.name"
            @input="updateSpecialityName($event.target.innerHTML)"></span>
    </div>
    <div class="--modification-buttons">
      <div class="--delete" @click="deleteSpeciality">
        <span class="material-icons">delete</span>
      </div>
      <div class="--update" @click="updateSpeciality">
        <span class="material-icons">save</span>
      </div>
    </div>
    <div class="--add-speciality">
      <submit-button class="--add-speciality-button" @click="goToIndicator">Показать индекаторы</submit-button>
    </div>
  </div>
</template>

<script>
import SubmitButton from "../Buttons/SubmitButton.vue";
import SpecialityService from "../../../services/speciality.service";

const specialityService = new SpecialityService();
export default {
  name: "TheSpeciality",
  components: {SubmitButton},
  data() {
    return {
      specialityName: '',
    }
  },
  props: {
    speciality: {
      type: Object,
      required: true
    }
  },
  computed: {

  },
  methods: {
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
        positionId: this.speciality.positionId
      });
    },
    goToIndicator(){
      this.$router.push('/speciality/indicators/' + this.speciality.id)
    }
  },
  mounted() {
    this.specialityName = this.speciality.name;
  }
}
</script>

<style scoped>
.--main-speciality {
  width: 85%;
  height: 60px;

  border: 1px solid #e6e6e6;

  margin-top: 10px;

  display: flex;
  align-items: center;

  position: relative;

  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  margin-bottom: 10px;
}

.--title {
  margin-left: 20px;

  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
}

.--title-input {
  outline: none;
}

.--modification-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-left: 30px;
}

.--delete, .--update {
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
  right: 3%;
}

.--add-speciality-button {
  width: 100%;
  height: 40px;


  color: black;
  background: rgba(51, 168, 213, 0.47);
  border-radius: 6px;
}
</style>