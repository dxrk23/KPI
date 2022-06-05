<script>
import KPITable from './UI/KPITable.vue';
import TheUploadComponent from './UI/TheUploadComponent.vue';
import UsersTable from './UI/UsersTable.vue';

export default {
  name: 'TheTaskList',
  components: {TheUploadComponent, KPITable, UsersTable},
  computed: {
    isUserAdmin() {
      return JSON.parse(localStorage.getItem('user')).isAdmin;
    },
    getTableData() {
      if (this.$route.params.for) {
        return this.$route.params.for;
      } else {
        return JSON.parse(localStorage.getItem('user')).username;
      }
    },
  },
  mounted() {
  },
};
</script>

<template>
  <div class="--task-list-main">
    <div class="--task-list-title">Key Performance Indicators (KPIs)</div>
    <div class="--task-list-content">
      <the-upload-component v-if="this.$route.params.id"/>
      <k-p-i-table v-if="!this.$route.params.id" :for="getTableData" class="--table"></k-p-i-table>
      <div v-if="!this.$route.params.id" class="--description">
        *Статья/монография в соавторстве для данной категории считается только для одного ученого или по долям <br/>
        **В случае наличия научных статей/монографий, превышающих требуемое количество в п.1, 1 (одна) статья/монография
        закрывает п.2 <br/>
        *** В случае наличия научных статей/монографий, превышающих требуемое количество в п.1, и закрывающих п.2, 1
        (одна) статья/монография закрывает п.3 <br/>
        **** В случае наличия научных статей/монографий, превышающих требуемое количество в п.1,3, и закрывающих пп.2-3,
        1 (одна) статья/монография закрывает п.4
      </div>
    </div>
  </div>
</template>

<style scoped>
.--task-list-main {
  width: 100%;
  height: 100%;

  padding-left: 41px;
}

.--task-list-title {
  font-size: 32px;
  font-weight: bold;
  line-height: 37px;
  margin-top: 44px;
}

.--table {
  margin: auto;
}

.--task-list-content {
  margin-top: 58px;
  width: 95%;

  overflow-y: auto;
}

.--description {
  margin-top: 30px;
  padding: 5px 29px 11px 13px;
  background: #d9d9d9;
}
</style>
