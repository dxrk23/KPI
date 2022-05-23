import { createStore } from 'vuex';
import { auth } from './modules/auth.module';
import { animations } from './modules/animations.module';
import { block } from './modules/block.module';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    animations,
    block,
  },
});
