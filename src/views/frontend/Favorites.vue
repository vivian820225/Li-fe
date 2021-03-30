<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <TitleBanner :titleText=title :bgImg=bgImg class="md:mb-12 mb-6" />
    <!-- 無收藏內容 -->
    <div
    v-if="products.length < 0"
    class="h-custom text-center mb-8 md:mb-28">
      <p class="font-bold md:text-3xl sm:text-2xl text-xl sm:mb-8 mb-4 text-center">
        您還沒有收藏任何商品喔！
      </p>
      <router-link to="/products"
      class="btn text-base bg-primary-default
      hover:bg-primary-dark transition md:mb-16 mb-8">
        快來逛逛吧！
        <span class="material-icons btn__icon block ml-2 relative
        border-2 border-gray-900 rounded-full">
          arrow_forward
        </span>
      </router-link>
      <img class="m-auto" src="~@/assets/images/box.png" alt="">
    </div>
    <!-- 收藏列表 -->
    <div
    v-else
    class="favorite-list md:mb-28 mb-8">
      <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        <ProductCard :item=product :is-like=isLike v-for="(product, idx) in products" :key=idx />
      </div>
    </div>
  </div>
</template>

<script>
import TitleBanner from '@/components/frontend/TitleBanner.vue';
import ProductCard from '@/components/frontend/ProductCard.vue';

export default {
  name: 'Favorities',
  data() {
    return {
      title: '我的收藏',
      bgImg: './images/bg-fav.jpg',
      isLike: false,
      products: [],
      tempProduct: {
        imageUrl: [],
        options: {},
      },
      pagination: {},
    };
  },
  components: {
    TitleBanner,
    ProductCard,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;

      this.axios
        .get(api)
        .then((res) => {
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$store.dispatch('updateLoading', false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .h-custom {
    min-height: calc(100vh - 480px);
  }

  @media screen and (max-width: 768px) {
    .h-custom {
      min-height: auto;
    }
  }
</style>
