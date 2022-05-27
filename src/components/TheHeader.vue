<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TheHeader',
  methods: {
    ...mapActions({
      setProfileDropdown: 'block/setProfileDorpdownOpen',
    }),

    toggleProfileDropdown() {
      this.setProfileDropdown(!this.isProfileDropdownOpen);
    },
  },
  computed: {
    ...mapGetters({
      isProfileDropdownOpen: 'block/isProfileDorpdownOpen',
    }),
    getUser() {
      return {
        name: 'John',
        lastname : 'Doe',
      }
    },
  },
};
</script>

<template>
  <header class="--header-main">
    <div class="--menu-button"><span class="material-icons" @click="toggleMenu()">menu</span></div>
    <div class="--title">AITU KPI - platform</div>
    <div class="--user-info">
      <span class="material-icons">notifications</span>
      <span class="material-icons">chat</span>
      <span>{{`${getUser.name} ${getUser.lastname}`}}</span>
      <span class="material-icons" @click="toggleProfileDropdown()">person</span>
    </div>
  </header>
</template>

<style scoped>
.--header-main {
  height: 52px;
  width: 96.3%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fff;

  margin: 31px auto 33px;
}

span {
  user-select: none;
}

.--menu-button {
  width: 45px;
  height: 45px;

  color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  pointer-events: none;
}

.--menu-button:hover {
  cursor: pointer;
  opacity: 0.7;
}

.--user-info {
  min-width: 328px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.--user-info > span:hover {
  cursor: pointer;
  opacity: 0.7;
}

.material-icons {
  font-size: 30px;
}

.--title {
  cursor: default;
  text-align: center;
  width: 300px;
  user-select: none;
}
</style>
