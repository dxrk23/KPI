<template>
  <main class="--main-home">
    <the-header></the-header>
    <div class="--body-components">
      <the-menu />
      <the-body />
      <the-right-sidebar />
    </div>
    <div class="--modal">
      <CreateUserModal v-if="selectedModal === 'create'" />
      <UpdateUserModal v-if="selectedModal === 'update'" />
    </div>
  </main>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheMenu from '../components/TheMenu.vue';
import TheBody from '../components/TheBody.vue';
import TheRightSidebar from '../components/TheRightSidebar.vue';
import {mapGetters} from 'vuex';
import ProfileDropdown from '../components/UI/Dropdowns/ProfileDropdown.vue';
import CreateUserModal from '../components/UI/Modals/CreateUserModal.vue';
import UpdateUserModal from '../components/UI/Modals/UpdateUserModal.vue';

export default {
  name: 'Home',
  components: {CreateUserModal, ProfileDropdown, TheRightSidebar, TheBody, TheHeader, TheMenu, UpdateUserModal},
  methods: {},
  computed: {
    ...mapGetters({
      isProfileDropdownOpen: 'block/isProfileDorpdownOpen',
      selectedModal: 'modals/selectedModal',
    }),
  },
};
</script>

<style scoped>
.--main-home {
  width: 100%;
  height: 100%;

  background: #f0f0f1;
}

.--modal {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.--body-components {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: start;

  margin-top: 21px;
}
</style>
