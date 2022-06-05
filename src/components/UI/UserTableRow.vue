<script>
export default {
  name: 'UserTableRow',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToKPI() {
      this.$router.push(`/task/period/${this.$route.params.periodId}/user/${this.user.id}`);
    },
  },
};
</script>

<template>
  <tr class="--table-row">
    <td class="--number-column">{{ user.index + 1 }}</td>
    <td class="--name-column" @click="goToKPI()">{{ user.fullName }}</td>
    <td class="--uploaded-column">Uploaded</td>
    <td class="--viewed-column">Viewed</td>
    <td class="--portion-column">30/30</td>
  </tr>
</template>

<style scoped>
td {
  border: 1px solid black;
}

.--name-column {
  width: 427px;
  height: 30px;

  text-align: left;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
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

th,
td {
  padding: 9px;
  text-align: center;
}
</style>
