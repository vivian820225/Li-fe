<template>
  <div id="app" class="text-gray-800">
    <Loading :active.sync="isLoading" >
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
