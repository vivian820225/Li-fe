<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide v-for="(item, id) in eventBanner" :key="id">
      <img :src="item.url" class="rounded-lg" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'EventCarousel',
  data() {
    return {
      isActive: false,
      eventBanner: [
        {
          id: 1,
          url: 'images/carousel-item-1.jpg',
        },
        {
          id: 2,
          url: 'images/carousel-item-2.jpg',
        },
        {
          id: 3,
          url: 'images/carousel-item-3.jpg',
        },
      ],
      swiperOption: {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  mounted() {
    this.whiteMask();
  },
  methods: {
    whiteMask() {
      const sliders = document.querySelectorAll('.swiper-slide');
      // eslint-disable-next-line func-names
      sliders.forEach((slider) => slider.addEventListener('transitionend', function () {
        // eslint-disable-next-line no-console
        console.log(slider);
        if (this.classList.includes('swiper-slide-active')) {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      }));
    },
  },
};
</script>

<style lang="scss">
  .white-mask {
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      left: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, .5);
    }
  }
</style>
