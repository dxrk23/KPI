<script>
import UserTableRow from './UserTableRow.vue';

export default {
  name: 'UserTable',
  components: {UserTableRow},
};
</script>

<template>
  <div class="--table-main">
    <table>
      <tr>
        <th class="--number-column --table-header">Nº</th>
        <th class="--table-header --name-column">Users</th>
        <th class="--uploaded-column --table-header">Uploaded</th>
        <th class="--viewed-column --table-header">Viewed</th>
        <th class="--table-header --portion-column">Portion</th>
      </tr>
      <user-table-row/>
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
