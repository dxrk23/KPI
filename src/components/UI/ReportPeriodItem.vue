<script>
export default {
  name: 'ReportPeriodItem',
  props: {
    period: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPeriod() {
      this.$router.push('/task/period/' + this.period.id);
    },
  },
};
</script>

<template>
  <div class="--period-item">
    {{ period.name }} ({{ new Date(period.from).toLocaleDateString() }} -
    {{ new Date(period.to).toLocaleDateString() }})
    <div class="--open-button" @click="openPeriod()">Open</div>
  </div>
</template>

<style scoped>
.--period-item {
  margin: 10px;

  width: 100%;
  height: 60px;

  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #e0e0e0;

  display: flex;
  align-items: center;

  position: relative;

  padding-left: 20px;
}

.--open-button {
  width: 60px;
  height: 30px;

  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #e0e0e0;

  position: absolute;
  right: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.--open-button:hover {
  cursor: pointer;
  background: #e0e0e0;
}

.--open-button:active {
  background: #d0d0d0;
}
</style>
