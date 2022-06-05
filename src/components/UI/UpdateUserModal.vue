<template>
  <div class="--modal-main">
    <div class="--close" @click="closeModal()">X</div>

    <form>
      <div class="--profile-image-block">
        <div class="--profile-image-container"></div>
        <div class="--profile-image-upload-container">
          <span class="--button-upload">
            <input accept=".png" type="file" />
            <input class="--button-remove" type="button" value="x" />
            Choose image
          </span>
        </div>
      </div>

      <div class="--name-block">
        <span class="--label">Name:</span>
        <input class="--input" placeholder="Name" type="text" />
      </div>

      <div class="--surname-block">
        <span class="--label">Surname:</span>
        <input class="--input" placeholder="Surname" type="text" />
      </div>

      <div class="--email-block">
        <span class="--label">Email:</span>
        <input class="--input" placeholder="Email" type="email" />
      </div>

      <div class="--role-block">
        <span class="--label">Role:</span>
        <dropdown :selects="positionsItems" class="--dropdown" @select="selectPosition"></dropdown>
      </div>

      <div class="--button-block">
        <the-button class="--button">Update user</the-button>
      </div>
    </form>
  </div>
</template>

<script>
import Dropdown from './Dropdown.vue';
import TheButton from './TheButton.vue';

import PositionService from '../../services/position.service';
import EmployeeService from '../../services/employee.service';

import { mapActions } from 'vuex';

const positionService = new PositionService();
const employeeService = new EmployeeService();

// TODO - Finish binding and implement user update

export default {
  name: 'CreateUserModal',
  components: { Dropdown, TheButton },
  data() {
    return {
      positionsItems: [],
      employee: null,
    };
  },
  methods: {
    ...mapActions({
      closeModal: 'modals/closeModal',
    }),
    selectPosition(position) {
      this.selectedPosition = position.id;
    },
    updateUser() {},
  },
  mounted() {
    employeeService.getEmployeeById(JSON.parse(localStorage.getItem('user')).sub).then((res) => {
      this.employee = res;
    });
  },
};
</script>

<style scoped>
.--modal-main {
  width: 440px;
  height: 730px;

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
  margin-top: 31px;
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
