<template>
  <div class="w-full mx-auto">
    <Loading :active.sync="isLoading" />
    <header class="header flex justify-between items-center px-4 py-3 bg-gray-800 text-white">
      <div class="flex justify-start items-center">
        <div class="flex items-center mr-8 z-60">
          <button
            @click="isOpen = !isOpen"
            aria-expanded="false"
            class="inline-flex items-center justify-center p-2 text-gray-500
            border-2 border-gray-500 rounded-lg transition
            focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gray-500"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              :class="isOpen ? 'hidden' : 'block'"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              :class="isOpen ? 'block' : 'hidden'"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <router-link to="/admin" class="w-20 mr-8">
          <img src="@/assets/images/logo.svg" alt="" />
        </router-link>
      </div>
      <a
        href="#"
        class="flex items-center hover:text-primary-default transition"
        @click.prevent="logout()"
      >
        <span class="material-icons mr-1">
          logout
        </span>
        登出
      </a>
    </header>
    <nav class="menu bg-gray-700">
      <ul class="flex flex-col divide-y-2 divide-gray-500 text-white">
        <li class="py-3 px-4">
          <router-link
            class="flex items-center hover:text-primary-default transition"
            to="/admin/products"
          >
            <span class="material-icons mr-2">
              dashboard_customize
            </span>
            商品管理
          </router-link>
        </li>
        <li class="py-3 px-4">
          <router-link
            class="flex items-center hover:text-primary-default transition"
            to="/admin/products"
          >
            <span class="material-icons mr-2">
              fact_check
            </span>
            訂單管理
          </router-link>
        </li>
        <li class="py-3 px-4">
          <router-link
            class="flex items-center hover:text-primary-default transition"
            to="/admin/products"
          >
            <span class="material-icons mr-2">
              paid
            </span>
            優惠券設定
          </router-link>
        </li>
        <li class="py-3 px-4">
          <router-link
            class="flex items-center hover:text-primary-default transition"
            to="/admin/products"
          >
            <span class="material-icons mr-2">
              panorama
            </span>
            圖片管理
          </router-link>
        </li>
      </ul>
    </nav>
    <main class="main bg-gray-50">
      <transition name="fade">
        <router-view v-if="checkSuccess" :token="token"/>
      </transition>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      token: '',
      uuid: process.env.VUE_APP_UUID,
      checkSuccess: false,
      isOpen: false,
      isLoading: false,
    };
  },
  created() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      this.isLoading = true;
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;

      this.axios.post(api, { api_token: this.token }).then((res) => {
        if (res.data.success) {
          this.checkSuccess = true;
          this.isLoading = false;
        }
      }).catch(() => {
        this.$router.push('/');
        this.isLoading = false;
      });
    },
    logout() {
      document.cookie = 'token=; expired=;';
      this.$router.push('/');
      this.$bus.$emit('message:push', '登出成功', 'success');
    },
  },
};
</script>
