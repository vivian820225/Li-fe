<template>
<div class="relative">
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item, idx) in products" :key="idx">
       <ProductCard :item=item :is-like=isLike @addtocart="addToCart(item.id, 1)" />
    </swiper-slide>
  </swiper>
  <div class="swiper-button-prev white swiper-hot-prev" slot="button-prev"></div>
  <div class="swiper-button-next white swiper-hot-next" slot="button-next"></div>
</div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'HotProducts',
  data() {
    return {
      isLike: false,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 24,
        freeMode: true,
        navigation: {
          nextEl: '.swiper-hot-next',
          prevEl: '.swiper-hot-prev',
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
  props: ['products'],
  created() {
    this.getCart();
  },
  components: {
    swiper,
    swiperSlide,
    ProductCard,
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          this.cart = res.data.data;
          this.totalprice = 0;
          this.cart.forEach((item) => {
            this.totalprice += (item.product.price * item.quantity);
          });
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    addToCart(id) {
      this.isLoading = true;
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
              this.isLoading = false;
            }).catch(() => {
              this.isLoading = false;
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
            this.isLoading = false;
          }).catch(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
</script>
