import { createStore } from 'vuex';
import { animations } from './modules/animations.module';
import { block } from './modules/block.module';
import { modals } from './modules/modals.module';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    animations,
    block,
    modals,
  },
});
