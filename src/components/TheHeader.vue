<script>
import {mapActions, mapGetters} from 'vuex';
import ProfileDropdown from "./UI/ProfileDropdown.vue";

export default {
  name: 'TheHeader',
  components: {
    ProfileDropdown
  },
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
      return JSON.parse(localStorage.getItem('user'));
    },
  },
};
</script>

<template>
  <header class="--header-main">
    <div class="--menu-button"><span class="material-icons" @click="toggleMenu()">menu</span></div>
    <div class="--title">AITU KPI - Platform</div>
    <div class="--user-info">
      <span>{{ getUser.fullName }}</span>
      <span class="material-icons" @click="toggleProfileDropdown()">person</span>
    </div>
    <ProfileDropdown v-if="isProfileDropdownOpen"/>
  </header>
</template>

<style scoped>
.--header-main {
  height: 52px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #fff;

  margin: 31px auto 33px;
  position: relative;
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
  justify-content: right;
}

.--user-info > span {
  margin-right: 30px;
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
