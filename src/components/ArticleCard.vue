<template>
  <div class="article-card text-gray-900">
    <div class="article-card__top">
      <a href="#" class="article-card__img">
        <img src="~@/assets/images/product.jpg" alt="" />
      </a>
    </div>
    <div class="article-card__content p-4">
      <div class="pr-3">
        <a
          href="#"
          class="block article-card__name text-lg mb-2 hover:text-primary-default transition"
        >
          {{ article.title }}
        </a>
        <p class="text-gray-500 mb-2">
          {{ article.description }}
        </p>
      </div>
      <a
        :href="article.linkUrl"
        class="block text-right text-primary-default underline hover:text-primary-dark transition"
      >
        查看完整文章
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: ['article'],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.article-card {
  display: block;
  list-style: none;
  position: relative;
  &__top {
    position: relative;
  }
  &__img {
    display: block;
    max-height: 200px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;
    img {
      width: 100%;
      max-width: 100%;
      transform: scale(1);
      transition: transform .2s ease;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
