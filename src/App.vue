<template>
  <div id="app" class="text-gray-800">
    <Loading :active.sync="isLoading" class="text-center">
      <span class="loader">
        <span class="loader-inner"></span>
      </span>
      <span class="relative top-4 text-primary-default text-2xl font-ubu font-bold">
        -- Loading --
      </span>
    </Loading>
    <MessageAlert />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import MessageAlert from '@/components/MessageAlert.vue';

export default {
  components: { MessageAlert },
  name: 'App',
  data() {
    return {
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
