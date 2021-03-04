<template>
<div class="relative">
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item, idx) in products" :key="idx">
       <ProductCard :item=item :is-like=isLike />
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
      tempProduct: {
        imageUrl: [],
        options: {},
      },
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
  components: {
    swiper,
    swiperSlide,
    ProductCard,
  },
  methods: {
  },
};
</script>
