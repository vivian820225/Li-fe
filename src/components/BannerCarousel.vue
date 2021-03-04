<template>
  <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <div class="banner relative">
          <div class="banner-bg">
            <img class="w-full rounded-lg" src="~@/assets/images/banner-1.jpg" alt="">
          </div>
          <div class="absolute top-1/2 left-28 transform -translate-y-16">
            <h3 class="text-white lg:text-5xl md:text-4xl text-3xl
            font-bold font-ubu text-shadow md:mb-3">
              Better
              <span class="text-primary-default">Leaf</span>
              , Better Life
            </h3>
            <p class="text-white lg:text-3xl md:text-xl text-lg
            font-bold text-shadow mb-4">淨化生活中的焦慮，打造舒適的品質</p>
            <a href="#" class="btn text-base bg-primary-default shadow-md
            hover:bg-primary-dark hover:shadow-none transition">
              一起搭配你的生活
              <span class="material-icons btn__icon block ml-2 relative
              border-2 border-gray-900 rounded-full">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="banner relative">
          <div class="banner-bg">
            <img class="w-full rounded-lg" src="~@/assets/images/banner-1.jpg" alt="">
          </div>
          <div class="absolute top-1/2 left-28 transform -translate-y-16">
            <h3 class="text-white text-5xl font-bold text-shadow mb-3">
              新品上市
            </h3>
            <p class="text-white text-3xl font-bold text-shadow mb-4">優惠組合，一同打造舒適生活</p>
            <a href="#" class="btn text-base bg-primary-default shadow-md
            hover:bg-primary-dark hover:shadow-none transition">
              立即選購
              <span class="material-icons btn__icon block ml-2 relative
              border-2 border-gray-900 rounded-full">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
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
  name: 'Carousel',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
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
};
</script>
