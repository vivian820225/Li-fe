<template>
  <div class="p-card text-gray-900">
    <div class="p-card__top">
      <router-link :to="`/product/${item.id}`" class="p-card__img">
        <img :src="item.imageUrl" :alt="item.title" />
      </router-link>
      <span class="discount bg-primary-default text-sm font-bold">8.5 折</span>
      <button type="button" class="favorite">
        <span class="material-icons text-primary-default" v-if="isLike">
          favorite
        </span>
        <span
          class="material-icons text-gray-500 hover:text-primary-default transition"
          v-else>
          favorite_border
        </span>
      </button>
    </div>
    <div class="p-card__content p-4 flex justify-between items-start">
      <div class="pr-3">
        <router-link
          :to="`/product/${item.id}`"
          class="block p-card__name text-base mb-2 hover:text-primary-default transition"
        >
          {{ item.title }}
        </router-link>
        <div class="flex justify-start items-center flex-wrap">
          <span
            class="price text-secondary-default font-ubu font-bold text-xl mr-2"
            >NT$ 1,000</span
          >
          <span class="price__original text-gray-500 font-ubu line-through"
            >NT$ 1,200</span
          >
        </div>
      </div>
      <button
        type="button"
        class="bg-primary-default text-gray-900 p-3 rounded-lg hover:bg-primary-dark transition"
      >
        <span class="material-icons block">add</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['item', 'isLike'],
  data() {
    return {

    };
  },
};
</script>

<style lang="scss">
.p-card {
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
  .discount {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 8px 12px;
  }
  .favorite {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
    outline: none;
    &:focus {
      outline: none;
    }
  }
}
</style>
