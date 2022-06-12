<script>
import userUtil from "../utils/user.util";

import TaskListUserTable from "./UI/Tables/TaskListUserTable.vue";

export default {
  name: 'TheTaskList',
  components: {TaskListUserTable},
  computed: {},
  mounted() {
    if (!userUtil.isUserRoot()) {
      this.$router.push(`/task/requirements/${userUtil.getUserId()}`);
    }
  },
};
</script>

<template>
  <div class="--task-list-main">
    <div class="--task-list-title">Key Performance Indicators (KPIs)</div>
    <div class="--task-list-content">
      <task-list-user-table>

      </task-list-user-table>
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
  width: 95%;

  overflow-y: auto;
}
</style>
