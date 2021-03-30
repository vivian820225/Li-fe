<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4 mb-8 md:mb-16">
    <StepsBar :steps="steps" class="max-w-screen-md mx-auto mb-8" />
    <div class="text-center mt-8 mx-auto mb-12">
      <img class="w-32 md:w-auto mx-auto mb-4" src="~@/assets/images/warning.png" alt="">
      <p class="font-bold md:text-2xl text-xl">
        您的訂單發生無預期的錯誤<br/>
        請您盡快連絡客服人員協助您處理<br/>
        造成不便，深感歉意
      </p>
    </div>
    <section id="contactUs" class="mb-8">
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
    <router-link
      class="block font-bold text-primary-default underline text-center"
      to="/"
    >
      回首頁
    </router-link>
  </div>
</template>

<script>
import StepsBar from '@/components/frontend/order/StepsBar.vue';

export default {
  name: 'OrderFailed',
  data() {
    return {
      steps: [
        {
          id: 1,
          title: '確認訂單資訊',
          done: true,
        },
        {
          id: 2,
          title: '訂單成立失敗',
          done: true,
        },
      ],
    };
  },
  components: {
    StepsBar,
  },
};
</script>
