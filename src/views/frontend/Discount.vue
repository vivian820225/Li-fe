<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <TitleBanner
    :titleText="title"
    :bgImg="bgImg"
    class="md:mb-12 mb-6" />
    <div class="block text-center sm:mb-12 mb-4">
      <p
        class="font-bold sm:text-2xl text-lg mb-2"
      >
        - 快來試試手氣，立即獲得優惠 -
      </p>
      <p class="font-bold md:text-3xl sm:text-2xl text-xl mb-4">
        您尚有
        <span class="px-1 font-ubu text-primary-dark">
          {{ chance }}
        </span>
        機會可以使用
      </p>
      <button
        type="button"
        class="btn sm:w-64 w-48 bg-primary-default text-lg"
        :class="{'bg-primary-light text-gray-500 cursor-not-allowed': noChance}"
        @click="pressHandler()"
        :disabled="noChance"
      >
        試試手氣
      </button>
    </div>
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
        <div
          id="good"
          class="box-wrapper"
          v-if="wellDone"
        >
          <span class="icon"><img src="images/icon/icon-giftcard.svg" alt=""></span>
          <p class="font-bold sm:text-3xl text-xl text-center mb-4">
            - 恭喜您獲得 -
          </p>
          <div class="box-content">
             <p class="md:text-2xl text-xl text-center font-ubu border-2 bg-gray-100
              mb-4 py-2 px-4">
              {{ winPrize.code }}
            </p>
            <p class="font-bold md:text-5xl text-3xl text-center sm:mb-8 mb-4">
              {{ winPrize.text }}
            </p>
            <button
              type="button"
              class="btn bg-primary-default w-full shadow-lg
              hover:shadow-none hover:bg-primary-dark transition"
              v-clipboard:copy="winPrize.code"
              @click="copySuccess"
              v-clipboard:error="clipboardErrorHandler"
            >
              立即使用
            </button>
          </div>
        </div>
        <div
        id="bad"
        class="box-wrapper"
        v-else
        >
          <span class="icon"><img src="images/icon/icon-sad.svg" alt=""></span>
          <p class="font-bold sm:text-3xl text-xl text-center mb-4">
            - 很可惜您獲得 -
          </p>
          <div class="box-content">
            <p class="font-bold md:text-5xl text-3xl text-center sm:mb-8 mb-4">
              {{ winPrize.text }}
            </p>
            <button
              type="button"
              class="text-primary-default underline mb-4
              hover:text-primary-dark transition"
              @click="showResult = !showResult"
            >
              回活動頁面
            </button>
            <router-link
              to="/"
              class="btn bg-primary-default w-full shadow-lg
              hover:shadow-none hover:bg-primary-dark transition"
            >
              回首頁
            </router-link>
          </div>
        </div>
        <button
          class="close-button"
          type="button"
          @click="showResult = !showResult"
        >
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
import TitleBanner from '@/components/frontend/TitleBanner.vue';
import OverlayMask from '@/components/frontend/OverlayMask.vue';

export default {
  name: 'Discount',
  data() {
    return {
      title: '優惠活動',
      bgImg: 'images/bg-event.jpg',
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      showResult: false,
      isPressed: false,
      degree: 0,
      active: -1,
      chance: 3,
      noChance: false,
      winPrize: {
        text: '',
        code: '',
      },
      wellDone: false,
      prizes: [
        {
          icon: 'images/icon/icon-money.svg',
          text: '9折<br/>優惠券',
          value: '9折優惠券',
          code: 'life_0090',
          count: 10,
        },
        {
          icon: 'images/icon/icon-money.svg',
          text: '5折<br/>優惠券',
          value: '5折優惠券',
          code: 'life_0050',
          count: 5,
        },
        {
          icon: 'images/icon/icon-dissatisfied.svg',
          text: '銘謝惠顧',
          value: '銘謝惠顧',
          code: '',
          count: 15,
        },
        {
          icon: 'images/icon/icon-sad.svg',
          text: '含淚說掰',
          value: '含淚說掰',
          count: 10,
        },
        {
          icon: 'images/icon/icon-restar.svg',
          text: '下回再見',
          value: '下回再見',
          code: '',
          count: 15,
        },
        {
          icon: 'images/icon/icon-giftcard.svg',
          text: '95折<br/>優惠券',
          value: '95折優惠券',
          code: 'life_0095',
          count: 10,
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
    generateIndex(data) {
      const indexArray = [];
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].count !== 0) indexArray.push(i);
      }
      return indexArray;
    },
    getRandomNumber(data) {
      const idx = this.generateIndex(data);
      const num = Math.floor(Math.random() * idx.length);
      return idx[num];
    },
    pressHandler() {
      if (this.isPressed) return;

      if (!this.noChance) {
        const data = this.prizes;
        const idx = this.getRandomNumber(data);
        if (idx === undefined) return;

        this.isPressed = true;
        this.active = -1;
        const circle = 6;
        const len = data.length;
        const rotate = circle * 360 + idx * (360 / len);
        this.degree += rotate - (this.degree % 360);

        setTimeout(() => {
          this.active = idx;
          if (data[idx].count > 0) {
            data[idx].count -= 1;
          }
          this.winPrize.text = this.prizes[idx].value;
          this.winPrize.code = this.prizes[idx].code;

          switch (this.winPrize.text) {
            case '9折優惠券':
            case '5折優惠券':
            case '不限金額免運':
              this.wellDone = true;
              break;
            default:
              this.wellDone = false;
          }
          this.showResult = true;
          this.isPressed = false;
        }, 6000);

        this.chance -= 1;
        if (this.chance < 1) this.noChance = true;
      }
    },
    rotateHandler() {
      return `rotate(${this.degree}deg)`;
    },
    closeResult() {
      this.showResult = false;
    },
    copySuccess() {
      this.$bus.$emit('message:push', '已複製代碼', 'success');
    },
    clipboardErrorHandler() {
      // eslint-disable-next-line no-alert
      alert('發生錯誤，請直接選取代碼複製');
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/layout/_wheel.scss';
</style>
