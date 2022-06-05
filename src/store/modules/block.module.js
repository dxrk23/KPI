export const block = {
    namespaced: true,
    state: {
        selectedBlock: 'Home',
        isProfileDorpdownOpen: false,
    },
    getters: {
        selectedBlock: (state) => state.selectedBlock,
        isProfileDorpdownOpen: (state) => state.isProfileDorpdownOpen,
    },
    actions: {
        setSelectedBlock({commit}, block) {
            commit('setSelectedBlock', block);
        },
        setProfileDorpdownOpen({commit}, isOpen) {
            commit('setProfileDorpdownOpen', isOpen);
        },
    },
    mutations: {
        setSelectedBlock(state, block) {
            state.selectedBlock = block;
        },
        setProfileDorpdownOpen(state, isOpen) {
            state.isProfileDorpdownOpen = isOpen;
        },
    },
};
