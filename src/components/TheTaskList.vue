<script>

export default {
  name: 'TheTaskList',
  components: { },
  computed: {},
  mounted() {},
};
</script>

<template>
  <div class="--task-list-main">
    <div class="--task-list-title">Key Performance Indicators (KPIs)</div>
    <div class="--task-list-content">
      <router-view></router-view>
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

.--task-list-content {
  margin-top: 58px;
  width: 95%;

  overflow-y: auto;
}
</style>
