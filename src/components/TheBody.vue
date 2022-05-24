<script>
import TheBlog from './TheBlog.vue';
import TheTaskList from './TheTaskList.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'TheBody',
  components: { TheTaskList, TheBlog },
  computed: {
    ...mapGetters({
      selectedBlock: 'block/selectedBlock',
    }),
  },
};
</script>

<template>
  <div class="--body-main">
    <router-view />
    <!--    <the-task-list v-if="selectedBlock === 'TaskList'"></the-task-list>-->
    <!--    <the-blog v-else-if="selectedBlock === 'Home'"></the-blog>-->
  </div>
</template>

<style scoped>
.--body-main {
  width: 55%;
  min-height: 600px;

  padding-bottom: 50px;
  margin-left: 21px;
  background: white;
}
</style>
