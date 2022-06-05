<script>
export default {
  name: 'KPITableRow',
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getLabel() {
      if (this.$route.params.id) {
        return this.row.description;
      }
      return this.row.title;
    },
  },
};
</script>

<template>
  <tr class="--table-row">
    <td class="--number-column">{{ row.index + 1 }}</td>
    <td :class="{ '--not-link': this.$route.params.id }" class="--name-column">{{ getLabel }}</td>
    <td class="--uploaded-column">{{ row.uploaded ? 'Uploaded' : 'Must upload' }}</td>
    <td class="--viewed-column">{{ row.viewed ? 'Viewed' : 'Not viewed' }}</td>
    <td class="--portion-column">{{ `${row.portion}/100` }}</td>
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
  color: #0f6cbf;
  cursor: pointer;
}

.--not-link {
  color: black;
}

.--uploaded-column {
  width: 104px;
  height: 30px;
}

.--viewed-column {
  width: 102px;
  height: 30px;
}

.material-icons {
  height: 30px;
  width: 30px;
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
