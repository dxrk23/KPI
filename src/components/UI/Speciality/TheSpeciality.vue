<template>
    <div class="--main-speciality">
      <div class="--title">{{ speciality.index + 1 }} - {{ speciality.name }}</div>
      <div class="--modification-buttons">
        <div class="--delete" @click="deleteSpeciality">
          <span class="material-icons" @click="deleteIndicator(indicator)">delete</span>
        </div>
        <div class="--update">
          <span class="material-icons">update</span>
        </div>
      </div>
      <div class="--add-speciality">
        <submit-button class="--add-speciality-button">Привязать индикатор</submit-button>
      </div>
    </div>
</template>

<script>
import SubmitButton from "../Buttons/SubmitButton.vue";

export default {
  name: "TheSpeciality",
  components: {SubmitButton},
  data() {
    return {}
  },
  props: {
    speciality: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteSpeciality(){
      this.$emit('onSpecialityDelete', this.speciality.id);
    }
  },
  mounted() {
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

  margin-bottom: 20px;
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