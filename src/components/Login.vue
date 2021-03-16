<template>
  <div class="login shadow-lg rounded-lg"
    :class="{'show': loginopen}">
    <div class="form-section">
      <img class="md:w-24 w-20 mb-4" src="~@/assets/images/logo.svg" alt="">
      <h2 class="font-bold md:text-2xl text-xl md:mb-8 mb-4">
        會員登入
      </h2>
      <form @submit.prevent="login" class="w-full flex flex-col">
        <label class="block w-full mb-4">
          <div class="flex justify-between items-center mb-1">
            <span class="text-gray-700">Email</span>
            <span class="text-gray-500 text-sm">*必填</span>
          </div>
          <input
            type="email"
            class="input-field"
            v-model="user.email"
            placeholder="example@service.com"
            required
          />
        </label>
        <label class="block w-full mb-4">
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
        <a href="#" class="underline text-primary-default self-end mb-8">
          忘記密碼
        </a>
        <button
          class="btn w-full bg-primary-default"
          type="submit">
          登入
        </button>
      </form>
    </div>
    <div class="bg-img">
      <button type="button" class="absolute p-4 right-0" @click="loginOpen">
        <span class="material-icons">
          close
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  props: ['loginopen'],
  data() {
    return {
      isOpen: false,
      user: {
        name: '',
        password: '',
      },
      token: '',
    };
  },
  methods: {
    loginOpen() {
      this.$emit('loginclose');
    },
    login() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;

      this.axios
        .post(api, this.user)
        .then((res) => {
          const { token } = res.data;
          const { expired } = res.data;
          // eslint-disable-next-line no-console
          console.log(res);

          document.cookie = `hexToken=${token};expires=${new Date(expired * 1000)};`;
          this.$router.push({ path: '/admin/products' });
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
