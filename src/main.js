import Vue from 'vue';
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
import currencyFilter from './filters/currency';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('Loading', Loading);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.filter('currency', currencyFilter);

Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
