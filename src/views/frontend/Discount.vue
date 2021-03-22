<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <TitleBanner :titleText="title" :bgImg="bgImg" class="md:mb-12 mb-6" />
    <p
      class="font-bold md:text-3xl sm:text-2xl text-xl sm:mb-12 mb-4 text-center"
    >
      - 快來試試手氣，立即獲得優惠 -
    </p>
    <div class="wheel-wrapper mb-8 md:mb-28">
      <div id="wheel">
        <ul class="prize-box">
          <li
            class="prize"
            :class="{ active: active === index }"
            :style="{ transform: transformHandler(index, 'prize') }"
            v-for="(item, index) in prizes"
            :key="index"
          >
            <div
              class="prize-content"
              :style="{ transform: transformHandler(index, 'content') }"
            >
              <div class="prize-icon">
                <img :src="`${item.icon}`" alt="" />
              </div>
              <div class="prize-text" v-html="item.text"></div>
            </div>
          </li>
        </ul>
        <div
          id="hand"
          @click="pressHandler()"
          :style="{ transform: rotateHandler() }"
        >
          <button class="press">GO</button>
        </div>
      </div>
    </div>
    <div class="result-module" v-if="showResult">
      <div class="box text-center relative">
        <div id="good" class="box-wrapper">
          <span class="icon"><img src="images/icon/icon-giftcard.svg" alt=""></span>
          <p class="font-bold text-3xl text-center mb-4">- 恭喜您獲得 -</p>
          <div class="box-content">
            <p class="font-bold text-5xl text-center mb-8">$100 購物金</p>
            <button type="button" class="btn bg-primary-default w-full shadow-lg
            hover:shadow-none hover:bg-primary-dark transition">
              立即使用
            </button>
          </div>
        </div>
        <div id="bad" class="box-wrapper">
          <span class="icon"></span>
          <p class="font-bold text-3xl text-center mb-4">- 很可惜您獲得 -</p>
          <div class="box-content">
            <p class="font-bold text-5xl text-center mb-8">含淚說掰</p>
            <button type="button" class="text-primary-default underline mb-4
            hover:text-primary-dark transition">回活動頁面</button>
            <button type="button" class="btn bg-primary-default w-full shadow-lg
            hover:shadow-none hover:bg-primary-dark transition">
              回首頁
            </button>
          </div>
        </div>
        <button class="close-button" type="button" @click="showResult = !showResult">
          <span class="material-icons">
            close
          </span>
        </button>
      </div>
    </div>
    <OverlayMask
    :overlayopen="showResult"
    @overlayclose="closeResult()"/>
  </div>
</template>

<script>
import TitleBanner from '@/components/TitleBanner.vue';
import OverlayMask from '@/components/OverlayMask.vue';

export default {
  name: 'Discount',
  data() {
    return {
      title: '優惠活動',
      bgImg: './images/banner-1.jpg',
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      showResult: false,
      isPressed: false,
      degree: 0,
      active: -1,
      prizes: [
        {
          icon: 'images/icon/icon-money.svg',
          text: '9折<br/>優惠券',
        },
        {
          icon: 'images/icon/icon-money.svg',
          text: '5折<br/>優惠券',
        },
        {
          icon: 'images/icon/icon-dissatisfied.svg',
          text: '銘謝惠顧',
        },
        {
          icon: 'images/icon/icon-sad.svg',
          text: '含淚說掰',
        },
        {
          icon: 'images/icon/icon-restar.svg',
          text: '再來一次',
        },
        {
          icon: 'images/icon/icon-giftcard.svg',
          text: '不限金額<br/>免運',
        },
      ],

    };
  },
  components: {
    TitleBanner,
    OverlayMask,
  },
  mounted() {
    window.addEventListener('resize', this.setDimensions);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setDimensions);
  },
  methods: {
    setDimensions() {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
    },
    transformHandler(index, location) {
      const len = this.prizes.length;
      const rotate = 360 / len;
      const rotateFrom = -rotate / 2;
      const skewY = rotate - 90;
      let translate = '';

      if (this.windowWidth < 620) {
        translate = 'translate(34px, 50px)';
      } else {
        translate = 'translate(53px, 50px)';
      }
      if (location === 'prize') {
        return `rotate(${rotateFrom + index * rotate}deg) skewY(${skewY}deg)`;
      }
      if (location === 'content') {
        return `skewY(${90 - rotate}deg) rotate(${rotate / 2}deg) ${translate}`;
      }

      return translate;
    },
    pressHandler() {},
    rotateHandler() {
      return `rotate(${this.degree}deg)`;
    },
    restart() {
      if (this.isPressed) return;
      if (this.degree % 360 !== 0) {
        this.degree += 360 - (this.degree % 360);
      }
      this.active = -1;
    },
    closeResult() {
      this.showResult = false;
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/layout/_wheel.scss';
</style>
