<template>
  <div class="--create-indicator-main">
    <div class="--title">Добавление индикатора</div>
    <div class="--content">
      <div class="--indicator-title">
        <span class="--input-label">*Краткое название индикатора </span>
        <div class="--input --title-input" contenteditable="true" @input="updateTitle($event.target.innerHTML)"
             v-html="title"></div>
      </div>
      <div class="--indicator-desc">
        <span class="--input-label">*Описание индикатора </span>
        <div class="--input --desc-input" contenteditable="true" @input="updateContent($event.target.innerHTML)"
             v-html="content"></div>
      </div>
      <div class="--indicator-note">
        <span class="--input-label">*Примечание к индикатору </span>
        <div class="--input --note-input" contenteditable="true" @input="updateNote($event.target.innerHTML)"
             v-html="note"></div>
      </div>

      <submit-button class="--create-button" @click="updateIndicator()">Обновить индикатор</submit-button>
    </div>
  </div>
</template>

<script>
import SubmitButton from "../Buttons/SubmitButton.vue";
import IndicatorService from "../../../services/indicator.service";

const indicatorService = new IndicatorService();

export default {
  name: "CreateIndicator",
  components: {SubmitButton},
  data() {
    return {
      title: '',
      content: '',
      note: '',

      updatedTitle: '',
      updatedContent: '',
      updatedNote: '',
    }
  },
  methods: {
    updateIndicator() {
      let indicator = {
        'name': this.updatedTitle,
        'description': this.updatedContent,
        'comment': this.updatedNote
      }

      indicatorService.updateIndicator(this.$route.params.indicatorId, indicator).then(() => {
        this.$router.push('/indicators');
      })
    },
    getIndicator() {
      indicatorService.getIndicator(this.$route.params.indicatorId).then(indicator => {
        this.title = indicator.name;
        this.content = indicator.description;
        this.note = indicator.comment;

        this.updatedTitle = indicator.name;
        this.updatedContent = indicator.description;
        this.updatedNote = indicator.comment;
      })
    },
    updateTitle(str) {
      this.updatedTitle = str
    },
    updateContent(str) {
      this.updatedContent = str;
    },
    updateNote(str) {
      this.updatedNote = str;
    }
  },
  created() {
    this.getIndicator();
  }
}
</script>

<style scoped>
.--create-indicator-main {
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
  margin-top: 58px;
  padding-left: 61px;
  padding-top: 41px;
}

.--input-label {
  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #000000;
}

.--input {
  background: #F0F0F1;
  min-height: 10%;

  margin-top: 16px;

  padding: 14px 14px 10px 24px;

  font-family: 'Inter', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  outline: none;
  word-break: break-word;
}

.--indicator-desc {
  margin-top: 16px;
  margin-bottom: 16px;
}

.--title-input {
  max-width: 35%;
}

.--desc-input {
  width: 85%;
  min-height: 300px;
}

.--note-input {
  width: 85%;
  min-height: 50px;
}

.--create-button {
  margin-top: 20px;
}
</style>