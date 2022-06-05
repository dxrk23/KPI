<script>
import TheButton from './TheButton.vue';
import PositionService from '../../services/position.service';
import RoleContainer from './RoleContainer.vue';

const positionService = new PositionService();

export default {
  name: 'Roles',
  components: {
    RoleContainer,
    TheButton,
  },
  data() {
    return {
      roleItems: [],
      roleInput: '',
    };
  },
  methods: {
    getInitialRoles() {
      positionService.getPositionsPage().then((response) => {
        this.roleItems = response.items;
      });
    },

    isNotEmpty(str) {
      return (
        str
          .replace(/<br>/g, '')
          .replace(/&nbsp;/g, '')
          .replace(/\s/g, '').length > 0
      );
    },

    addRole() {
      if (this.isNotEmpty(this.roleInput)) {
        positionService.createPosition({ name: this.roleInput }).then((response) => {
          this.roleItems.push(response);
          this.roleInput = '';
        });
      }
    },
  },
  mounted() {
    this.getInitialRoles();
  },
};
</script>

<template>
  <div class="--roles-main">
    <div class="--roles-header">Roles</div>
    <div class="--roles-body">
      <div class="--roles">
        <role-container v-for="role in roleItems" :role="role" @onRoleDelete="getInitialRoles()" />
      </div>
      <div class="--roles-add">
        Enter Role name
        <input v-model="roleInput" class="--role-input" type="text" />
        <the-button class="--button" @click="addRole()">Add Role</the-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.--roles-main {
  width: 100%;
  height: 100%;
  padding-left: 68px;
  padding-top: 76px;
}

.--roles-header {
  font-family: 'Arial', serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
}

.--roles-add {
  width: 25%;
  height: auto;
  font-size: 22px;
}

.--button {
  width: 120px;
  height: 40px;
  margin-top: 20px;
}

.--role-input {
  width: 100%;
  height: 50px;
  font-size: 22px;
  margin-top: 20px;
  padding-left: 10px;
}

.--roles-body {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.--roles {
  width: 70%;
  border: 2px solid #e6e6e6;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20px;
}
</style>
