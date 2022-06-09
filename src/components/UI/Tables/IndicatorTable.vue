<script>
import IndicatorService from "../../../services/indicator.service";

const indicatorService = new IndicatorService();

export default {
  name: "IndicatorTable",
  props: {
    indicatorRows : {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteIndicator(indicator){
      this.$emit('onIndicatorDelete', indicator);
    }
  }
}
</script>

<template>
  <div class="--indicator-table-main">
    <table>
      <thead>
        <tr class="--row --table-head">
          <th class="--number-col">№</th>
          <th>Name of KPI</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(indicator, index) in indicatorRows" :key="indicator.id" class="--table-body-row --row">
          <td class="--number-cell"> {{ index + 1 }} </td>
          <td v-html="indicator.name" class="--name-cell"></td>
          <div class="--buttons">
            <div class="--delete">
              <span class="material-icons" @click="deleteIndicator(indicator)">delete</span>
            </div>
            <div class="--update">
              <span class="material-icons">update</span>
            </div>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .--indicator-table-main {
    width: 100%;
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
    background: #4E4E53;
    color : white;

    height: 50px;
  }

  .--buttons{
    position: absolute;
    display: flex;
    right: 10px;
    height: 100%;
  }

  .--delete, .--update {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .--delete:hover, .--update:hover{
    opacity: 0.8;
  }


  .--number-col {
    width: 8%;
  }

  .--table-body-row {
    height: 60px;
    border: 1px solid black;
  }

  .--number-cell{
    text-align: center;
    border: 1px solid #e3e3e3;
  }

  .--name-cell {
    text-align: left;
    padding-left: 20px;
    border: 1px solid #e3e3e3;
  }
</style>