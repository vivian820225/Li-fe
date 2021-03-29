<template>
  <div class="p-card text-gray-900">
    <div class="p-card__top">
      <router-link :to="`/product/${item.id}`" class="p-card__img">
        <img :src="item.imageUrl[0]" :alt="item.title" />
      </router-link>
      <span
        v-if="item.price"
        class="discount bg-primary-light text-xs"
      >
        特價
      </span>
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
            >NT {{ item.price | currency }}</span
          >
          <span class="price__original text-gray-500 font-ubu line-through"
            >NT {{ item.origin_price | currency }}</span
          >
        </div>
      </div>
      <button
        type="button"
        class="bg-primary-default text-gray-900 p-3 rounded-lg hover:bg-primary-dark transition"
        @click="addToCart(item.id, 1)"
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
  methods: {
    addToCart(id, num) {
      this.$emit('addtocart', id, num);
    },
  },
};
</script>

<style lang="scss">
.p-card {
  display: block;
  list-style: none;
  position: relative;
  animation: zoomIn .3s;
  &__top {
    position: relative;
  }
  &__img {
    display: block;
    max-height: 280px;
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
    bottom: .5rem;
    left: .5rem;
    padding: 6px 12px;
    border-radius: 1rem;
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

@media screen and (max-width: 768px) {
  .p-card {
    &__content {
      border: solid 2px;
      border-bottom-right-radius: 1rem;
      border-bottom-left-radius: 1rem;
      border-top: none;
      @apply border-gray-100;
    }
  }
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1);
    transform-origin: center center 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
