<template>
  <div class="--modal-main">
    <div class="--close" @click="closeModal()">X</div>
    <div class="--upload" @click="switchMode()">{{ mode === 'csv' ? 'Создать вручную' : 'Загрузить CSV' }}</div>

    <form v-if="mode === 'single'">
      <div class="--surname-block">
        <span class="--label">Фамилия:</span>
        <input v-model="surname" class="--input" placeholder="Фамилия" type="text" />
      </div>

      <div class="--name-block">
        <span class="--label">Имя:</span>
        <input v-model="firstName" class="--input" placeholder="Имя" type="text" />
      </div>

      <div class="--surname-block">
        <span class="--label">Отчество:</span>
        <input v-model="middleName" class="--input" placeholder="Отчество" type="text" />
      </div>

      <div class="--email-block">
        <span class="--label">Email:</span>
        <input v-model="email" class="--input" placeholder="Email" type="email" />
      </div>

      <div class="--role-block">
        <span class="--label">Role:</span>
        <dropdown
          @loadMore="loadMorePositions"
          :selects="getPositionItems"
          class="--dropdown"
          @select="selectPosition"
        ></dropdown>
      </div>

      <div class="--button-block">
        <submit-button class="--button" @click="createUser">Создать пользователя</submit-button>
      </div>
    </form>

    <div class="--file-form" v-if="mode === 'csv'">
      <input ref="fileInput" id="fileInput" type="file" v-on:change="changeFile()" style="display: none" />
      <div class="--file-input">
        <label class="--csv-button" for="fileInput">Выбрать CSV файл</label>
      </div>

      <div class="--button-block">
        <submit-button class="--button" @click="uploadCsv">Создать пользователя</submit-button>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../Dropdowns/Dropdown.vue';
import SubmitButton from '../Buttons/SubmitButton.vue';

import EmployeeService from '../../../services/employee.service';
import PositionService from '../../../services/position.service';
import { mapActions } from 'vuex';

const positionService = new PositionService();
const employeeService = new EmployeeService();

const UploadMode = { Csv: 'csv', SingleEmployee: 'single' };

export default {
  name: 'CreateUserModal',
  components: { Dropdown, SubmitButton },
  data() {
    return {
      positions: {},
      image: null,
      firstName: '',
      surname: '',
      email: '',
      middleName: '',
      selectedPosition: null,
      csvFile: null,
      mode: UploadMode.SingleEmployee,
    };
  },
  computed: {
    getPositionItems() {
      return this.positions.items ?? [];
    },
  },
  methods: {
    ...mapActions({
      closeModal: 'modals/closeModal',
    }),
    selectPosition(position) {
      this.selectedPosition = position.id;
    },
    createUser() {
      employeeService.createEmployee({
        email: this.email,
        firstName: this.firstName,
        lastName: this.surname,
        positionId: this.selectedPosition,
        middleName: this.middleName,
      });
    },
    loadMorePositions() {
      let pageNumber =
        this.positions.currentPage + 1 <= this.positions.totalPages ? this.positions.currentPage + 1 : null;
      if (!pageNumber) return;

      positionService.getPositionsPage(pageNumber, 10).then((res) => {
        this.positions.currentPage = res.currentPage;
        res.items.forEach((item) => {
          this.positions.items.push(item);
        });
      });
    },
    changeFile() {
      this.csvFile = this.$refs.fileInput.files[0];
    },

    uploadCsv() {
      console.log(this.csvFile);
      let form = new FormData();
      form.append('file', this.csvFile);

      employeeService
        .importEmployee(form)
        .then((res) => {
          this.$swal('Сотрудники успешно импортированы');
        })
        .catch((e) => {
          this.$swal({
            icon: 'error',
            title: 'Ошибка',
            text: 'Что-то пошло не так во время импорта сотрудников',
          });
        });
    },
    loadInitialPosition() {
      positionService.getPositionsPage(1, 10).then((positions) => {
        this.positions = positions;
      });
    },

    switchMode() {
      this.mode === UploadMode.Csv ? (this.mode = UploadMode.SingleEmployee) : (this.mode = UploadMode.Csv);
    },
  },
  created() {
    this.loadInitialPosition();
  },
};
</script>

<style scoped>
.--file-form {
  padding: 45px;
}

.--file-input {
  text-align: center;
  margin-bottom: 60px;
}

.--csv-button {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
}

.--csv-button:hover {
  background-color: rgb(234, 245, 245);
}

.--modal-main {
  width: 110%;

  background-color: #fff;
  display: block;
  position: relative;
  border: 1px solid black;
}

.--input {
  width: 359px;
  height: 51px;

  background: rgba(0, 0, 0, 0.0001);
  border: 1px solid #000000;
  padding-left: 24px;
  border-radius: 10px;

  font-family: 'Tahoma', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 31px;
  display: flex;
  align-items: flex-end;

  color: black;
}

.--button {
  width: 200px;
  height: 51px;
  margin: auto;
}

.--dropdown {
  width: 359px;
  height: 51px;
}

.--name-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-left: 39px;
  margin-top: 8px;
}

.--surname-block,
.--email-block,
.--role-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-left: 39px;
  margin-top: 8px;
}

.--button-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 31px;
  margin-bottom: 30px;
}

.--label {
  font-family: 'Tahoma', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 27px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  color: #4f4f56;
}

.--close {
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 24px;
  cursor: pointer;
}

.--button-upload {
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  position: relative;
  color: #fff;
  background-color: #2a72d4;
  border: 1px solid #166b8a;
  padding: 5px 10px;
}

.--button-upload:hover,
.--button-upload:focus {
  background-color: #7ca9e6;
}

.--button-remove {
  display: none;
}

.--button-upload input {
  cursor: pointer;
  height: 100%;
  position: absolute;
  filter: alpha(opacity=1);
  -moz-opacity: 0;
  opacity: 0;
}

.--upload {
  font-family: 'Arial', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #2817ec;

  text-align: center;
  margin-top: 24px;

  cursor: pointer;
}

.--profile-image-container {
  width: 90px;
  height: 100px;

  background: #d9d9d9;
  margin-right: 33px;
}

.--profile-image-block {
  width: 340px;
  height: 100px;

  margin: 32px auto 0;

  display: flex;
  align-items: start;
}
</style>
