<script>
import KPITable from './KPITable.vue';

export default {
  name: 'TheUploadComponent',
  components: {KPITable},
  computed: {
    isUserAdmin() {
      return JSON.parse(localStorage.getItem('user')).isAdmin;
    },
  },
};
</script>

<template>
  <div class="--upload-main">
    <k-p-i-table></k-p-i-table>
    <table class="--upload-form">
      <tr>
        <td class="--title-row">Submission Status</td>
        <td>Waiting to upload document</td>
      </tr>
      <tr>
        <td class="--title-row">Time remaining</td>
        <td>2 month</td>
      </tr>
      <tr>
        <td class="--title-row">File submission</td>
        <td><input id="" name="" type="file"/></td>
      </tr>
    </table>

    <div v-if="isUserAdmin" class="--grade">
      <input class="--grade-input" type="number"/>
      /100
      <button class="--grade-button">Grade</button>
    </div>
  </div>
</template>

<style scoped>
.--upload-main {
}

.--upload-form {
  margin-top: 50px;
  width: 50%;
}

td {
  border: 1px solid #ccc;
  padding: 10px;
}

.--title-row {
  width: 200px;
  min-height: 50px;
}

.--grade {
  margin-top: 50px;
  margin-left: 100px;
  width: 20%;

  font-size: 20px;
  font-weight: bold;

  display: flex;
  justify-content: space-between;
  align-content: center;
}

.--grade-button {
  margin-left: 10px;
  width: 81px;
  height: 28px;

  background: #33a8d5;
  border: none;
  border-radius: 6px;

  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.--grade-input {
  width: 54px;
  height: 24px;
  border: 1px solid black;

  font-size: 20px;
  font-weight: bold;

  text-align: center;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.--grade-button:hover {
  background: #2f9ec4;
  cursor: pointer;
}

.--grade-button:active {
  background: #2f9ec4;
  opacity: 0.8;
}
</style>
