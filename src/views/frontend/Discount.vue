<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <TitleBanner :titleText="title" :bgImg="bgImg" class="md:mb-12 mb-6" />
    <p
      class="font-bold md:text-3xl sm:text-2xl text-xl sm:mb-8 mb-4 text-center"
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
      <div class="overlay"></div>
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
        <button class="close-button" type="button">
          <span class="material-icons">
            close
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBanner from '@/components/TitleBanner.vue';

export default {
  name: 'Discount',
  data() {
    return {
      title: '優惠活動',
      bgImg: './images/banner-1.jpg',
      isPressed: false,
      degree: 0,
      active: -1,
      prizes: [
        {
          icon: 'images/icon/icon-giftcard.svg',
          text: '$50<br/>購物金',
        },
        {
          icon: 'images/icon/icon-giftcard.svg',
          text: '$100<br/>購物金',
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
          icon: 'images/icon/icon-money.svg',
          text: '全品項<br/>8 折',
        },
      ],
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      showResult: false,
    };
  },
  components: {
    TitleBanner,
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
    // eslint-disable-next-line consistent-return
    transformHandler(index, location) {
      const len = this.prizes.length;
      const rotate = 360 / len;
      const rotateFrom = -rotate / 2;
      const skewY = rotate - 90;
      let translate = '';
      // if (index === 0) {
      //   // eslint-disable-next-line no-console
      //   console.log(`數量：${len}`, `開始角度：${rotateFrom}`, `旋轉角度：${rotate}`, `頃斜角度：${skewY}`);
      // }
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
  },
};
</script>

<style lang="scss">
.wheel-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/images/wheel-bg.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

#wheel {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "";
    display: block;
    width: 600px;
    height: 600px;
    background-image: url("~@/assets/images/wheel.svg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    position: relative;
    z-index: 2;
  }
}

.prize-box {
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background-color: #cbcbcb;
  position: absolute;
  left: 50%;
  top: 1%;
  transform: translateX(-50%);
  overflow: hidden;
  z-index: 1;
}

.prize {
  width: 50%;
  height: 50%;
  background-color: #f2f2f2;
  border: 5px solid #002520;
  position: absolute;
  top: 0;
  right: 0;
  transform-origin: 0 100%;
  &:nth-of-type(2n) {
    background-color: transparent;
  }
  &.active {
    background-color: #ffc107;
  }
}

.prize-content {
  width: 100px;
  height: 100px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.prize-text {
  font-size: 20px;
  font-weight: bold;
  color: #002520;
  text-align: center;
}

#hand {
  position: absolute;
  top: 32%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: 100px 145px;
  transition: all 6s cubic-bezier(0.38, 0.22, 0.1, 0.99) 0s;
  z-index: 5;
  &::after {
    content: "";
    width: 100px;
    height: 180px;
    background-image: url("~@/assets/images/hand.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    position: absolute;
    top: -80px;
    z-index: 10;
    pointer-events: none;
  }
}

.press {
  width: 80px;
  height: 80px;
  padding: 0;
  color: #ffd967;
  background: #ff9900;
  border: none;
  border-radius: 50%;
  font-size: 40px;
  font-weight: bold;
  z-index: 15;
  outline: none;
  @apply font-ubu;
}

// module
.result-module {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}
.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.box {
  position: relative;
  width: 100%;
  max-width: 420px;
  color: #002520;
  border-radius: 1rem;
  overflow: hidden;
}
.box-wrapper {
  padding: 2rem;
  background-repeat: no-repeat;
  background-size: 140%;
  background-position: center -150px;
  .icon {
    display: inline-block;
    width: 48px;
    height: 48px;
    img {
      max-width: 100%;
      height: 100%;
    }
  }
}
#good {
  background-color: #FFC107;
  background-image: url('~@/assets/images/box-good.png');
}
#bad {
  background-color: #CCCCCC;
  background-image: url('~@/assets/images/box-bad.png');
}
.box-content {
  padding: 2.5rem;
  background-color: #fff;
  border-radius: 1rem;
}

@media screen and (max-width: 620px) {
  #wheel {
    &::after {
      width: 380px;
      height: 380px;
      background-image: url("~@/assets/images/wheel-m.svg");
    }
  }
  .prize-box {
    width: 370px;
    height: 370px;
  }
  .prize-text {
    font-size: 16px;
  }
  #hand {
    top: 42%;
    &::after {
      width: 80px;
      height: 128px;
      top: -60px;
    }
  }
  .press {
    width: 54px;
    height: 54px;
    font-size: 28px;
  }
}
</style>
