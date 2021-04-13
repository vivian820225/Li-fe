import axios from 'axios';

export default {
  namespaced: true,
  state: {
    allProducts: [],
    products: [],
    product: {},
    currentImg: '',
    pagination: {},
  },
  mutations: {
    ALL_PRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PRODUCT(state, payload) {
      state.product = payload;
    },
    PRODUCT_CURRENT_IMG(state, payload) {
      state.currentImg = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
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
          context.commit('LOADING', false, { root: true });
        })
        .catch(() => {
          context.commit('LOADING', false, { root: true });
        });
    },
    getProduct(context, id) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;

      axios
        .get(api)
        .then((res) => {
          context.commit('PRODUCT', res.data.data);
          context.commit('PRODUCT_CURRENT_IMG', res.data.data.imgUrl[0]);
          context.commit('LOADING', false, { root: true });
        }).catch(() => {
          context.commit('LOADING', false, { root: true });
        });
    },
  },
  getters: {
    filterHotProducts(state) {
      return state.allProducts.filter((item) => item.options.popular);
    },
    filterRecProducts(state) {
      return state.allProducts.filter((item) => item.options.recommend);
    },
  },
};
