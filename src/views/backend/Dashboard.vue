<template>
  <div class="w-full mx-auto">
    <Loading :active.sync="isLoading" />
    <h1>Welcome</h1>
    <a href="#" @click.prevent="logout()">登出</a>
    <transition name="fade">
      <router-view v-if="checkSuccess" :token="token"/>
    </transition>
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
    },
  },
};
</script>
