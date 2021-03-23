<template>
  <div id="app" class="text-gray-800">
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
};
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
