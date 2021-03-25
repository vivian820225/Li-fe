<template>
  <div class="w-full mx-auto">
    <Loading :active.sync="isLoading" />
    <div class="flex h-screen antialiased text-gray-900">
      <!-- Desktop Menu -->
      <aside
        class="flex-shrink-0 w-64 bg-gray-700 border-r-2 border-gray-500 lg:block hidden"
      >
        <div class="flex flex-col">
          <nav class="flex-1 space-y-2 overflow-y-hidden hover:overflow-y-auto">
            <ul class="flex flex-col divide-y-2 divide-gray-500 text-white">
              <li class="flex items-center text-gray-300 transition-colors
              hover:bg-gray-500 hover:text-primary-default">
                <router-link
                  class="w-full flex items-center md:py-4 p-2"
                  to="/admin/products"
                >
                  <span class="material-icons mr-2">
                    dashboard_customize
                  </span>
                  商品管理
                </router-link>
              </li>
              <li class="flex items-center text-gray-300 transition-colors
              hover:bg-gray-500 hover:text-primary-default">
                <router-link
                  class="w-full flex items-center md:py-4 p-2"
                  to="/admin/orders"
                >
                  <span class="material-icons mr-2">
                    fact_check
                  </span>
                  訂單管理
                </router-link>
              </li>
              <li class="flex items-center text-gray-300 transition-colors
              hover:bg-gray-500 hover:text-primary-default">
                <router-link
                  class="w-full flex items-center md:py-4 p-2"
                  to="/admin/coupons"
                >
                  <span class="material-icons mr-2">
                    paid
                  </span>
                  優惠券設定
                </router-link>
              </li>
              <li class="flex items-center text-gray-300 transition-colors
              hover:bg-gray-500 hover:text-primary-default">
                <router-link
                  class="w-full flex items-center md:py-4 p-2"
                  to="/admin/storage"
                >
                  <span class="material-icons mr-2">
                    panorama
                  </span>
                  圖片管理
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div class="flex-1 h-full overflow-x-hidden overflow-y-auto">
        <header class="relative bg-gray-800 text-white">
          <div class="flex items-center justify-between lg:py-4 py-2 px-4
          border-b border-gray-100">
            <div class="flex items-center flex-grow">
              <div class="flex items-center md:mr-8 mr-4 z-60 lg:hidden">
                <button
                  @click="asideOpen = !asideOpen"
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
                    :class="asideOpen ? 'hidden' : 'block'"
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
                    :class="asideOpen ? 'block' : 'hidden'"
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
              class="flex text-gray-500 items-center hover:text-white transition"
              @click.prevent="logout()"
            >
              <span class="material-icons mr-1">
                logout
              </span>
              登出
            </a>
          </div>
          <!-- Mobile Menu -->
          <nav class="space-y-2" v-if="asideOpen">
            <ul class="flex flex-col divide-y-2 divide-gray-500 text-white">
              <li class="flex items-center text-gray-300 transition-colors
              hover:bg-gray-500 hover:text-primary-default">
                <router-link
                  class="w-full flex items-center py-3 px-4"
                  to="/admin/products"
                >
                  <span class="material-icons mr-2">
                    dashboard_customize
                  </span>
                  商品管理
                </router-link>
              </li>
              <li class="flex items-center text-gray-300 transition-colors
              hover:bg-gray-500 hover:text-primary-default">
                <router-link
                  class="w-full flex items-center py-3 px-4"
                  to="/admin/orders"
                >
                  <span class="material-icons mr-2">
                    fact_check
                  </span>
                  訂單管理
                </router-link>
              </li>
              <li class="flex items-center text-gray-300 transition-colors
              hover:bg-gray-500 hover:text-primary-default">
                <router-link
                  class="w-full flex items-center py-3 px-4"
                  to="/admin/coupons"
                >
                  <span class="material-icons mr-2">
                    paid
                  </span>
                  優惠券設定
                </router-link>
              </li>
              <li class="flex items-center text-gray-300 transition-colors
              hover:bg-gray-500 hover:text-primary-default">
                <router-link
                  class="w-full flex items-center py-3 px-4"
                  to="/admin/storage"
                >
                  <span class="material-icons mr-2">
                    panorama
                  </span>
                  圖片管理
                </router-link>
              </li>
            </ul>
          </nav>
        </header>
        <main class="main-area lg:py-6 py-4 px-4">
          <transition name="fade">
            <router-view v-if="checkSuccess" :token="token"/>
          </transition>
        </main>
      </div>
    </div>
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
      asideOpen: false,
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

<style lang="scss">
  @import '@/assets/scss/layout/backend/_table.scss';
</style>
