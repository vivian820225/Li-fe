<template>
<div class="relative">
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item, idx) in products" :key="idx">
      <ProductCard :item=item :is-like=isLike @addtocart="addToCart(item.id, 1)"/>
    </swiper-slide>
  </swiper>
  <div class="rec-prev swiper-button-prev white swiper-newest-prev" slot="button-prev">
  </div>
  <div class="rec-next swiper-button-next white swiper-newest-next" slot="button-next">
  </div>
</div>
</template>

<script>
import ProductCard from '@/components/frontend/ProductCard.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'RecProduct',
  props: ['products'],
  data() {
    return {
      isLike: false,
      cart: [],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 24,
        freeMode: true,
        navigation: {
          nextEl: '.rec-next',
          prevEl: '.rec-prev',
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        },
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
    ProductCard,
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$store.dispatch('updateLoading', true);
      this.axios
        .get(api)
        .then((res) => {
          this.cart = res.data.data;
          this.totalprice = 0;
          this.cart.forEach((item) => {
            this.totalprice += (item.product.price * item.quantity);
          });
          this.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          this.$store.dispatch('updateLoading', false);
        });
    },
    addToCart(id) {
      this.$store.dispatch('updateLoading', true);
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;

      const checkCart = this.cart.some((item) => {
        if (item.product.id === id) {
          const cart = {
            product: id,
            quantity: item.quantity + 1,
          };

          this.axios
            .patch(api, cart)
            .then(() => {
              this.getCart();
              this.$bus.$emit('get-cart');
              this.$store.dispatch('updateLoading', false);
            }).catch(() => {
              this.$bus.$emit('message:push', '發生錯誤，加入失敗', 'danger');
              this.$store.dispatch('updateLoading', false);
            });
          return true;
        }
        return false;
      });
      if (!checkCart) {
        const cart = {
          product: id,
          quantity: 1,
        };

        this.axios
          .post(api, cart)
          .then(() => {
            this.getCart();
            this.$bus.$emit('get-cart');
            this.$store.dispatch('updateLoading', false);
          }).catch(() => {
            this.$store.dispatch('updateLoading', false);
          });
      }
    },
  },
};
</script>
