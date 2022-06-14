<script>
import RequirementService from '../../../services/requirement.service';
import IndicatorService from '../../../services/indicator.service';
import SubmissionService from '../../../services/submission.service';
import ReportPeriodPartService from '../../../services/report.period.part.service';
import GradeService from '../../../services/grade.service';
import FileService from '../../../services/file.service';
import SubmitButton from '../Buttons/SubmitButton.vue';
import UserUtil from '../../../utils/user.util';

const requirementService = new RequirementService();
const indicatorService = new IndicatorService();
const submissionService = new SubmissionService();
const reportPeriodPartService = new ReportPeriodPartService();
const fileService = new FileService();
const gradeService = new GradeService();
export default {
  name: 'ManageKPI',
  components: { SubmitButton },
  data() {
    return {
      requirement: {},
      indicator: {},
      submission: {},
      periodPart: {},

      file: null,
      downloadFileURL: null,
      downloadFile: null,

      customGrade: 0,
    };
  },
  methods: {
    getRequirements() {
      requirementService
        .getRequirementById(this.$route.params.requirementId)
        .then((response) => {
          this.requirement = response;
        })
        .then(() => {
          this.getIndicator();
          if (this.isUserRoot) {
            this.getSubmissionAdmin();
          } else {
            this.getSubmission();
          }
          this.getPeriodPart();
        });
    },
    getIndicator(indicatorId) {
      indicatorService.getIndicator(this.requirement.indicatorId).then((response) => {
        this.indicator = response;
      });
    },
    getSubmissionAdmin() {
      submissionService
        .getSubmissionByUserIdAndRequirementId(this.$route.params.employeeId, this.requirement.id)
        .then((response) => {
          this.submission = response;
        })
        .then(() => {
          if (this.submission) {
            this.getFile();
          }
        });
    },
    getSubmission() {
      submissionService
        .getSubmissionByRequirementId(this.requirement.id)
        .then((response) => {
          this.submission = response;
        })
        .then(() => {
          if (this.submission) {
            this.getFile();
          }
        });
    },

    getPeriodPart() {
      reportPeriodPartService.getPeriodPartById(this.requirement.periodPartId).then((response) => {
        this.periodPart = response;
      });
    },
    getHowManyLeftDate() {
      let dueDate = new Date(this.periodPart.to);
      return dueDate.toLocaleDateString() + ', ' + dueDate.toLocaleTimeString();
    },
    changeFile() {
      this.file = this.$refs.fileInput.files[0];
    },
    uploadFile() {
      let file = new FormData();
      file.append('file', this.file);

      fileService.uploadFile(file).then((res) => {
        submissionService.postSubmission({
          requirementId: this.requirement.id,
          fileIds: [res.fileId],
        });
      });
    },

    fullGrade() {
      gradeService.UpdateGrade(this.$route.params.employeeId, this.requirement.id, { value: this.requirement.weight });
    },

    customGradeSubmit() {
      gradeService.UpdateGrade(this.$route.params.employeeId, this.requirement.id, { value: +this.customGrade });
    },

    getFile() {
      fileService.downloadFile(this.submission.fileIds[0]).then((response) => {
        this.downloadFile = new Blob([response.data], { type: response.headers['content-type'] });
        this.downloadFileURL = URL.createObjectURL(this.downloadFile);
      });
    },
  },
  computed: {
    isTimeExpired() {
      let now = new Date().getTime();
      let dueDate = new Date(this.periodPart.to).getTime();
      return now > dueDate;
    },
    isUserRoot() {
      return UserUtil.isUserRoot();
    },
  },
  created() {
    this.getRequirements();
  },
};
</script>

<template>
  <div class="--manage-kpi-main">
    <div class="--content">
      <table class="--kpi-table">
        <thead>
          <tr class="--row --table-head">
            <th class="--name-col">KPI</th>
            <th class="--portion-column">Portion</th>
          </tr>
        </thead>
        <tbody>
          <tr class="--row">
            <td class="--name-data">{{ indicator.description }}</td>
            <td class="--portion-data">{{ requirement.weight }}</td>
          </tr>
        </tbody>
      </table>

      <div class="--upload-table">
        <table class="--upload-table">
          <tr class="--row">
            <td>Submission status</td>
            <td>{{ submission ? 'Uploaded' : 'Waiting to upload document' }}</td>
          </tr>
          <tr class="--row">
            <td>Submit due date</td>
            <td>{{ getHowManyLeftDate() }}</td>
          </tr>
          <tr v-if="!isUserRoot" class="--row">
            <td>File submission</td>
            <td>
              <input ref="fileInput" type="file" v-on:change="changeFile()" />
            </td>
          </tr>
          <tr v-if="submission" class="--row">
            <td>Download File</td>
            <td>
              <a :href="downloadFileURL" download>Download File</a>
            </td>
          </tr>
        </table>

        <submit-button v-if="!isUserRoot" class="--upload-button" @click="uploadFile">Upload file</submit-button>
        <div v-if="isUserRoot" class="--grade-buttons">
          <div class="--grade-custom">
            <submit-button class="--grade-full-button" @click="fullGrade">
              {{ requirement.weight }}/{{ requirement.weight }}
            </submit-button>
            <input v-model="customGrade" class="--custom-grade-input" type="number" />
            <submit-button class="--grade-custom-button" @click="customGradeSubmit">Grade</submit-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.--manage-kpi-main {
  width: 100%;
}

.--kpi-table {
  width: 90%;
  margin: 20px auto;
}

.--row {
  height: 35px;
  position: relative;

  border: 1px solid black;
}

.--upload-table {
  margin-top: 30px;
  margin-left: 20px;
}

.--upload-table > .--row > td {
  border: 1px solid #e3e3e3;
  padding: 10px;
}

.--grade-custom {
  width: 10%;
}

.--grade-custom-button {
  width: 35%;
}

.--grade-full-button {
  width: 35%;
}

.--grade-custom {
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;

  width: 30%;

  margin-left: 20px;
  margin-top: 30px;
}

.--custom-grade-input {
  appearance: none;
  border: 2px solid black;

  font-size: 24px;

  width: 20%;
  height: 50px;

  text-align: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.--upload-button {
  width: 15%;
  height: 40px;

  margin-left: 20px;
  margin-top: 30px;
}

.--table-head {
  background: #4e4e53;
  color: white;

  height: 50px;
}

.--name-col {
  width: 80%;
}

.--portion-column {
  width: 10%;
}

.--name-data,
.--uploaded-data,
.--portion-data {
  font-family: 'Inter', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #232326;

  border: 1px solid #e3e3e3;
}

.--uploaded-data,
.--portion-data {
  text-align: center;
}

.--name-data {
  text-align: start;
  padding-left: 20px;
}
</style>
