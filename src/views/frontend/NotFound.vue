<template>
  <div class="h-custom max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4
  flex items-center justify-center flex-col">
    <h2 class="font-bold md:text-3xl sm:text-2xl text-xl my-8 text-center">您所蒐尋的頁面不存在喔！</h2>
    <div class="img md:mb-20 mb-8">
      <img class="m-auto" src="~@/assets/images/404.png" alt="">
    </div>
    <router-link
      class="w-40 btn text-base bg-primary-default hover:bg-primary-dark transition mb-8 md:mb-28"
      to="/">
      回首頁
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style lang="scss" scoped>
.h-custom {
  min-height: calc(100vh - 300px);
}
@media screen and (max-width: 768px) {
  .h-custom {
    min-height: auto;
  }
}
</style>
