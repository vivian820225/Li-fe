<template>
  <div class="p-card text-gray-900">
    <div class="p-card__top">
      <a href="#" class="p-card__img">
        <img src="~@/assets/images/product.jpg" alt="" />
      </a>
    </div>
    <div class="p-card__content p-4">
      <div class="pr-3">
        <a
          href="#"
          class="block p-card__name text-lg mb-2 hover:text-primary-default transition"
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
