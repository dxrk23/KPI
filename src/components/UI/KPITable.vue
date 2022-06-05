<script>
import KPITableRow from './KPITableRow.vue';

export default {
  name: 'KPITable',
  components: { KPITableRow },
  computed: {
    getRows() {
      if (this.$route.params.id) {
        return fakeKpi.filter((kpi) => kpi.id === this.$route.params.id);
      }
      return fakeKpi.filter((kpi) => {
        return kpi.for === this.for;
      });
    },
  },
  props: {
    for: {
      type: String,
      required: false,
    },
  },
  methods: {
    openKPI(id) {
      this.$router.push('/task/' + id);
    },
  },
};
</script>

<template>
  <div class="--table-main">
    <table>
      <tr>
        <th class="--number-column --table-header">Nº</th>
        <th class="--table-header --name-column">Name of KPI</th>
        <th class="--uploaded-column --table-header">Uploaded</th>
        <th class="--viewed-column --table-header">Viewed</th>
        <th class="--table-header --portion-column">Portion</th>
      </tr>
      <k-p-i-table-row v-for="(row, index) in getRows" :row="{ index, ...row }" @click="openKPI(row.id)" />
    </table>
  </div>
</template>

<style scoped>
table {
  margin: auto;
  width: 100%;
}

.--table-main {
}

.--table-header {
  background: #4e4e53;
  color: white;
}

.--number-column {
  width: 50px;
  height: 30px;
}

th,
td {
  padding: 9px;
}

.--name-column {
  width: 427px;
  height: 30px;
}

.--uploaded-column {
  width: 104px;
  height: 30px;
}

.--viewed-column {
  width: 102px;
  height: 30px;
}

.--portion-column {
  width: 102px;
  height: 30px;
}
</style>
