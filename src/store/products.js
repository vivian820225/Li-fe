import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allProducts: [],
    products: [],
    pagination: {},
  },
  actions: {
    getAllProducts(context) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?paged=50`;

      axios
        .get(api)
        .then((res) => {
          context.commit('ALL_PRODUCTS', res.data.data);
          context.commit('LOADING', false, { root: true });
        })
        .catch(() => {
          context.commit('LOADING', false, { root: true });
        });
    },
    getProducts(context, page) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;

      axios
        .get(api)
        .then((res) => {
          context.commit('PRODUCTS', res.data.data);
          context.commit('PAGINATION', res.data.meta.pagination);
          // this.filterItems = res.data.data;
          context.commit('LOADING', false, { root: true });
        })
        .catch(() => {
          context.commit('LOADING', false, { root: true });
        });
    },
  },
  mutations: {
    ALL_PRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
  },
  getters: {
    allProducts(state) {
      return state.allProducts;
    },
  },
};
