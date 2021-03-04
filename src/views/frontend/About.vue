<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <TitleBanner :titleText=title :bgImg=bgImg class="md:mb-12 mb-6" />
    <div class="content grid grid-cols-3 gap-4 mb-10 md:mb-8">
      <div class="content-title text-center md:text-left">
        <h2 class="font-bold md:text-3xl text-xl mb-4">
          現代生活忙碌，節奏快<br/>
          在繁忙的日常中，人們時常忘記要放慢步調。
        </h2>
        <p class="font-bold md:text-3xl text-xl">你是否還記得放鬆的感覺？</p>
      </div>
      <div class="content-text">
        <p class="md:text-lg text-base mb-4">
          身心疲憊的人渴望擺脫繁雜的日常生活，當你的腦中浮現這樣的想法，正意味著你正處於一個無法放鬆的狀態...
        </p>
        <p class="md:text-lg text-base mb-4">
          說實話，突然要讓一個拼命叫自己不斷前進的人停下腳步是不太容易的，試著調整步伐節奏，
          坐下來時多放眼看一下四周，感受身邊的氣味、色彩、氛圍，或許你能從中體會到不一樣。
        </p>
        <p class="md:text-lg text-base mb-4">
          Li-fe 陪伴你在緊湊的生活中得到一點點鼓勵。
        </p>
      </div>
      <div class="content-img">
        <img class="m-auto" src="~@/assets/images/contact_us-2.png" alt="">
      </div>
    </div>
    <section id="contactUs" class="mb-8 md:mb-28">
      <h2 class="section-title mb-4">
        聯絡我們
        <span class="sub-section-title">Contact Us</span>
      </h2>
      <p class="md:text-lg text-base mb-4">
        關於商品及服務相關問題，歡迎來電或來信詢問，我們將儘速提供協助。
      </p>
      <ul class="grid md:grid-cols-3 text-center way gap-4">
        <li>
          <i class="contact-icon phone"></i>
          <h3 class="font-bold text-xl text-secondary-default mb-4">客服專線</h3>
          <p class="md:text-lg text-base mb-4">
            02-1234-5678<br/>
            服務時間：週一至週六 09:00 - 18:00
          </p>
        </li>
        <li>
          <i class="contact-icon email"></i>
          <h3 class="font-bold text-xl text-secondary-default mb-4">服務信箱</h3>
          <p class="md:text-lg text-base mb-4">
            service@lifestore.com.tw<br/>
            平均回覆時間： 24 小時
          </p>
        </li>
        <li>
          <i class="contact-icon location"></i>
          <h3 class="font-bold text-xl text-secondary-default mb-4">門市據點</h3>
          <p class="md:text-lg text-base mb-4">
            郵遞區號 001<br/>
            臺北市新店區沒這條路 1 號
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import TitleBanner from '@/components/TitleBanner.vue';

export default {
  name: 'About',
  data() {
    return {
      title: '品牌故事',
      bgImg: './images/banner-1.jpg',
    };
  },
  components: {
    TitleBanner,
  },
};
</script>

<style lang="scss" scoped >
  .content {
    grid-template-areas:
      "G1 G1 G3"
      "G2 G2 G3"
      "G2 G2 G3";
  }
  .content-title {
    grid-area: G1;
  }
  .content-text {
    grid-area: G2;
  }
  .content-img {
    grid-area: G3;
  }
  .contact-icon {
    display: inline-block;
    width: 48px;
    height: 48px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    &.phone {
      background-image: url('~@/assets/images/icon/icon-phone.svg');
    }
    &.email {
      background-image: url('~@/assets/images/icon/icon-mail.svg');
    }
    &.location {
      background-image: url('~@/assets/images/icon/icon-location.svg');
    }
  }
  .way {
    li {
      @apply px-4 py-8 bg-gray-100 rounded-lg;
    }
  }
  @media screen and (max-width: 768px) {
    .content {
      grid-template-areas:
        "G1 G1 G1"
        "G3 G3 G3"
        "G2 G2 G2";
    }
    .content-img {
      img {
        max-height: 320px;
      }
    }
  }
</style>
