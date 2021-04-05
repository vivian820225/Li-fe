<template>
  <div class="p-card text-gray-900">
    <div class="p-card__top">
      <router-link :to="`/product/${item.id}`" class="p-card__img">
        <img v-if="!item.imageUrl" src="~@/assets/images/img-loading.jpg" alt="">
        <img v-else :src="item.imageUrl[0]" :alt="item.title" />
      </router-link>
      <span
        v-if="item.options.popular"
        class="discount bg-primary-light text-xs"
      >
        熱門
      </span>
      <button
        v-if="favorList.indexOf(item.id) !== -1"
        type="button"
        class="favorite"
        @click="removeFavorList(item.id)"
      >
        <span class="material-icons text-primary-default hover:text-primary-dark transition">
          favorite
        </span>
      </button>
      <button
        v-else
        type="button"
        class="favorite"
        @click="addToFavorList(item.id)"
      >
        <span
          class="material-icons text-gray-500 hover:text-primary-default transition"
        >
          favorite
        </span>
      </button>
    </div>
    <div class="p-card__content p-4 flex justify-between items-start">
      <div class="md:pr-3">
        <router-link
          :to="`/product/${item.id}`"
          class="block p-card__name sm:text-base text-sm md:mb-1
          hover:text-primary-default transition"
        >
          {{ item.title }}
        </router-link>
        <div class="flex justify-start sm:items-center items-start sm:flex-row flex-col">
          <span
            class="price text-secondary-default font-ubu font-bold
            lg:text-lg md:text-base text-sm sm:mr-2"
            >NT {{ item.price | currency }}</span
          >
          <span class="price__original text-gray-500 font-ubu text-xs line-through"
            >NT {{ item.origin_price | currency }}</span
          >
        </div>
      </div>
      <button
        type="button"
        class="add-to-cart
        bg-primary-default text-gray-900 p-3 rounded-lg hover:bg-primary-dark transition"
        @click="addToCart(item.id, 1)"
      >
        <span class="material-icons block">add</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProductCard',
  props: ['item', 'isLike'],
  data() {
    return {
    };
  },
  computed: {
    ...mapState('favorListModules', {
      favorList: (state) => state.favorList,
    }),
  },
  methods: {
    addToCart(id, num) {
      this.$emit('addtocart', id, num);
    },
    addToFavorList(id) {
      this.$store.dispatch('favorListModules/addToFavorList', id);
      this.$bus.$emit('message:push', '已加入收藏', 'success');
    },
    removeFavorList(id) {
      this.$store.dispatch('favorListModules/removeFavorList', id);
      this.$bus.$emit('message:push', '已移除收藏', 'warning');
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
      position: relative;
      padding: .5rem;
      border: solid 2px;
      border-bottom-right-radius: 1rem;
      border-bottom-left-radius: 1rem;
      border-top: none;
      @apply border-gray-100;
    }
    .discount {
      padding: 4px 12px;
    }
  }
  .add-to-cart {
    position: absolute;
    right: .5rem;
    top: -50%;
  }

}

@media screen and (max-width: 580px) {
  .p-card {
    .add-to-cart {
    padding: .25rem;
    top: -40px;
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
