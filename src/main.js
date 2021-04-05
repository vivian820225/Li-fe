import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import vuescroll from 'vuescroll';
import Clipboard from 'v-clipboard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import currencyFilter from './filters/currency';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('Loading', Loading);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper);
Vue.use(vuescroll, { ops: {} });
Vue.use(Clipboard);
Vue.use(AOS);

AOS.init();

Vue.filter('currency', currencyFilter);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
