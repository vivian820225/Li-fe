export default {
  namespaced: true,
  state: {
    favorList: [],
  },
  actions: {
    addToFavorList(context, id) {
      context.commit('ADD_TO_FAVOR_LIST', id);
    },
    removeFavorList(context, id) {
      context.commit('REMOVE_FAVOR_LIST', id);
    },
  },
  mutations: {
    ADD_TO_FAVOR_LIST(state, payload) {
      state.favorList.push(payload);
      localStorage.setItem('myFavorList', JSON.stringify(state.favorList));
    },
    REMOVE_FAVOR_LIST(state, payload) {
      state.favorList.splice(state.favorList.indexOf(payload), 1);
      localStorage.setItem('myFavorList', JSON.stringify(state.favorList));
    },
    GET_FAVOR_LIST(state) {
      state.favorList = JSON.parse(localStorage.getItem('myFavorList')) || [];
    },
  },
  getters: {
    favorListProducts(state, getters, rootGetters) {
      // eslint-disable-next-line max-len
      return rootGetters.productsModules.allProducts.filter((item) => state.favorList.indexOf(item.id) !== -1);
    },
  },
};
