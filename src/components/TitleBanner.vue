<template>
  <div class="banner" :style="{'background-image': 'url(' + bgImg + ')' }">
    <h1>{{ titleText }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TitleBanner',
  props: ['titleText', 'bgImg'],
};
</script>

<style lang="scss" scoped>
  .banner {
    background-repeat: no-repeat;
    background-position: left center;
    @apply rounded-lg;
  }
  h1 {
    @apply text-2xl font-bold px-8 py-4 text-center;
  }

  @screen md {
    h1 {
      @apply text-4xl p-12 text-left;
    }
  }
</style>
