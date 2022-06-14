<script>
export default {
  name: "StaffUserTable",

  props: {
    rows: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  methods: {
    allowSpecialtyChange(employee) {
      this.$emit('onSpecialtyChange', employee);
    },

    resetPassword(employee) {
      this.$emit('onResetPassword', employee);
    },
  },
};
</script>


<template>
  <div class="--staff-table-main">
    <table>
      <thead>
        <tr class="--row --table-head">
          <th class="--number-col">№</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Отчество</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in rows" :key="employee.id" class="--table-body-row --row">
          <td class="--number-cell">{{ (page - 1) * 10 + index + 1 }}</td>
          <td v-html="employee.name.firstName" class="--name-cell"></td>
          <td v-html="employee.name.lastName" class="--name-cell"></td>
          <td v-html="employee.name.middleName" class="--name-cell"></td>
          <td v-html="employee.email" class="--name-cell"></td>

          <div class="--buttons">
            <div class="--reset">
              <span class="material-icons" @click="resetPassword(employee)">lock_reset</span>
            </div>
            <div class="--change">
              <span class="material-icons" @click="allowSpecialtyChange(employee)">change_circle</span>
            </div>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.--staff-table-main {
  width: 99%;
}

table {
  width: inherit;
  height: inherit;
}

.--row {
  height: 35px;
  position: relative;
}

.--table-head {
  background: #4e4e53;
  color: white;

  height: 50px;
}

.--buttons {
  position: absolute;
  display: flex;
  right: 10px;
  height: 100%;
}

.--reset,
.--change {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.--reset:hover,
.--change:hover {
  opacity: 0.8;
}

.--number-col {
  width: 8%;
}

.--table-body-row {
  height: 60px;
  border: 1px solid black;
}

.--number-cell {
  text-align: center;
  border: 1px solid #e3e3e3;
}

.--name-cell {
  text-align: left;
  padding-left: 20px;
  border: 1px solid #e3e3e3;
}
</style>

