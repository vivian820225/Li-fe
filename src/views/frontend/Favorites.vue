<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <TitleBanner :titleText=title :bgImg=bgImg class="md:mb-12 mb-6" />
    <!-- 無收藏內容 -->
    <div
    v-if="favorListProducts.length < 1"
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
        <ProductCard
          :item=item
          v-for="(item, idx) in favorListProducts"
          :key=idx
        />
      </div>
    </div>
  </div>
</template>

<script>
import TitleBanner from '@/components/frontend/TitleBanner.vue';
import ProductCard from '@/components/frontend/ProductCard.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Favorities',
  data() {
    return {
      title: '我的收藏',
      bgImg: './images/bg-fav.jpg',
      tempProduct: {
        imageUrl: [],
        options: {},
      },
    };
  },
  components: {
    TitleBanner,
    ProductCard,
  },
  computed: {
    ...mapState('favorListModules', {
      favorList: (state) => state.favorList,
    }),
    ...mapGetters('favorListModules', ['favorListProducts']),
  },
  created() {
    this.$store.dispatch('productsModules/getAllProducts');
    this.$store.commit('favorListModules/GET_FAVOR_LIST');
  },
  methods: {
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
