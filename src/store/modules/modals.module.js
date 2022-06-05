export const modals = {
  namespaced: true,
  state: {
    selectedModal: null,
  },
  getters: {
    selectedModal: (state) => state.selectedModal,
  },
  actions: {
    setSelectedModal: ({ commit }, modal) => {
      commit('SET_SELECTED_MODAL', modal);
    },
    closeModal: ({ commit }) => {
      commit('SET_SELECTED_MODAL', null);
    },
  },
  mutations: {
    SET_SELECTED_MODAL: (state, modal) => {
      state.selectedModal = modal;
    },
  },
};
