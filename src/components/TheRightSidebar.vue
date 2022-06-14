<script>
import MenuItem from './UI/Menu/MenuItem.vue';
import { mapActions } from 'vuex';
import UserUtil from '../utils/user.util';
import ReportService from '../services/report.service';
import ReportPeriodService from '../services/report.period.service';

const reportService = new ReportService();
const reportPeriodService = new ReportPeriodService();

export default {
  name: 'TheRightSidebar',
  components: { MenuItem },
  data() {
    return {
      activePeriod: {},
      reportFileUrl: null,
    };
  },
  computed: {
    getRoute() {
      return this.$route.path;
    },
    isUserRoot() {
      return UserUtil.isUserRoot();
    },
  },
  methods: {
    ...mapActions({
      selectModal: 'modals/setSelectedModal',
      closeModal: 'modals/closeModal',
    }),
    goToCreator() {
      this.$router.push(`${this.$route.path}/add`);
    },
    openModal(modal) {
      this.closeModal();
      this.selectModal(modal);
    },
    downloadReport() {
      reportService.generateReport(this.activePeriod.id).then((response) => {
        let file = new Blob([response.data], { type: response.headers['content-type'] });
        this.reportFileUrl = URL.createObjectURL(file);
        window.open(this.reportFileUrl);
      });
    },
    getActivePeriod() {
      reportPeriodService.getPeriodActive().then((response) => {
        this.activePeriod = response;
      });
    },
  },
  created() {
    this.getActivePeriod();
  },
};
</script>

<template>
  <aside class="--right-block-main">
    <div class="--logo">
      <img alt="logo" src="../assets/logos/sign_in_logo.svg" />
    </div>
    <div class="--admin-menu">
      <menu-item v-if="getRoute === '/home' && isUserRoot" icon="note_add" label="Добавить пост" @click="goToCreator()" />
      <menu-item
        v-if="getRoute === '/indicators' && isUserRoot"
        icon="note_add"
        label="Добавить индикатор"
        @click="goToCreator()"
      />

      <menu-item v-if="getRoute === '/staff'" icon="person_add" label="Добавить сотрудника" @click="openModal('create')" />
      <menu-item
        v-if="isUserRoot && getRoute === '/staff'"
        icon="download"
        label="Скачать отчет"
        @click="downloadReport"
      ></menu-item>
      <hr style="margin-top: 10px; margin-bottom: 10px" />

      <!--      <menu-item icon="manage_accounts" label="Update user" @click="openModal('update')" />-->
      <!--      <menu-item icon="person_remove" label="Delete user" />-->
    </div>
  </aside>
</template>

<style scoped>
.--right-block-main {
  width: 22.2%;
  min-height: 450px;

  background: white;
  margin-left: 25px;
}

.--logo {
  width: 91%;
  height: auto;

  margin: 23px auto 0;
}

.--logo > img {
  width: inherit;
  height: inherit;
}

.--admin-menu {
  margin: 20px auto 0;
  width: 90%;
  height: auto;
}
</style>
