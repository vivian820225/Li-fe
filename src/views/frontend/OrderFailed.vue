<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <p>
      您的訂單發生無預期的錯誤<br/>
      請您盡快連絡客服人員協助您處理<br/>
      造成不便，深感歉意
    </p>
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
    <router-link class="text-primary-default underline" to="/">
      回首頁
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'OrderFailed',
};
</script>
