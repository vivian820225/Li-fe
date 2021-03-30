<template>
<div class="relative">
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <div class="banner relative">
        <div class="banner-bg">
          <img class="w-full rounded-lg" src="~@/assets/images/banner-1.jpg" alt="">
        </div>
        <div class="absolute sm:top-1/2 top-1/3 md:left-28 sm:left-16 left-4
        transform sm:-translate-y-16 -translate-y-8 pr-4">
          <h3 class="text-white lg:text-5xl md:text-4xl sm:text-3xl text-lg
          font-bold font-ubu text-shadow md:mb-3">
            Better
            <span class="text-primary-default">Leaf</span>
            , Better Life
          </h3>
          <p class="text-white lg:text-3xl md:text-xl text-base
          font-bold text-shadow sm:mb-4 mb-2 whitespace-normal">淨化生活中的焦慮，打造舒適的品質</p>
          <router-link
            to="/products"
            class="btn sm:text-base text-sm bg-primary-default
            sm:shadow-md hover:bg-primary-dark hover:shadow-none transition"
          >
            一起搭配你的生活
            <span class="hidden material-icons btn__icon sm:block ml-2 relative
            border-2 sm:border-gray-900 border-transparent rounded-full">
              arrow_forward
            </span>
          </router-link>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="banner relative">
        <div class="banner-bg">
          <img class="w-full rounded-lg" src="~@/assets/images/banner-2.jpg" alt="">
        </div>
        <div class="absolute sm:top-1/2 top-1/3 md:left-28 sm:left-16 left-4
        transform sm:-translate-y-16 -translate-y-8 pr-4">
          <h3 class="lg:text-5xl md:text-4xl sm:text-3xl text-lg
          font-bold md:mb-3">
            新品上市
          </h3>
          <p class="lg:text-3xl md:text-xl text-base
          font-bold sm:mb-4 mb-2 whitespace-normal">一同打造舒適生活</p>
          <router-link
            to="/products"
            class="btn sm:text-base text-sm bg-primary-default
            sm:shadow-md hover:bg-primary-dark hover:shadow-none transition"
          >
            立即選購
            <span class="hidden material-icons btn__icon sm:block ml-2 relative
            border-2 sm:border-gray-900 border-transparent rounded-full">
              arrow_forward
            </span>
          </router-link>
        </div>
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  <div id="banner-btn-prev" class="swiper-button-prev hidden md:block" slot="button-prev"></div>
  <div id="banner-btn-next" class="swiper-button-next hidden md:block" slot="button-next"></div>
</div>
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
          nextEl: '#banner-btn-next',
          prevEl: '#banner-btn-prev',
        },
      },
    };
  },
};
</script>

<style lang="scss">
.banner-bg img {
    height: 150px;
    object-fit: cover;
  }
@screen sm {
  .banner-bg img {
    height: 240px;
  }
}
@screen md {
  .banner-bg img {
    height: auto;
  }
}
</style>
