<template>
  <div class="login" :class="{'show': loginopen}">
    <img src="~@/assets/images/logo.svg" alt="">
    <label class="block">
      <div class="flex justify-between items-center mb-1">
        <span class="text-gray-700">Email</span>
        <span class="text-gray-500 text-sm">*必填</span>
      </div>
      <input
        type="email"
        class="input-field"
        v-model="user.email"
        placeholder="example@service.com"
        required autofocus
      />
    </label>
    <label class="block">
      <div class="flex justify-between items-center mb-1">
        <span class="text-gray-700">Password</span>
        <span class="text-gray-500 text-sm">*必填</span>
      </div>
      <input
        type="password"
        class="input-field"
        v-model="user.password"
        placeholder="password"
        required
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  props: ['loginopen'],
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      token: '',
    };
  },
  methods: {
    loginOpen() {
      this.$emit('loginopen');
    },
    login() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;

      this.axios
        .post(api, this.user)
        .then((res) => {
          const { token } = res.data;
          const { expired } = res.data;

          document.cookie = `hexToken=${token};expires=${new Date(expired * 1000)};`;
          this.$router.push('/admin/products');
          this.isLoading = false;
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.user.username = '';
          this.user.password = '';
          this.isLoading = false;
        });
    },
  },
};
</script>
