<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <TitleBanner :titleText=title :bgImg=bgImg class="md:mb-12 mb-6" />
    <div class="content-wrapper mx-auto">
      <h2 class="font-bold md:text-3xl text-2xl mb-4">包裝說明</h2>
        <p class="md:text-lg text-base pb-4 mb-4 border-b-2">
          為響應環保，一般包裝出貨將視情況使用二次紙箱及回收包材寄送。
        </p>
      <h2 class="font-bold md:text-3xl text-2xl mb-4">宅配運送服務</h2>
      <h4 class="font-bold text-xl mb-2">運費優惠</h4>
      <p>開幕慶全店購物不限金額，全台免運。</p>
      <h4 font-bold text-xl mb-2>配送區域</h4>
      <p class="md:text-lg text-base mb-4">全台(不含外島)，特殊偏遠地區無法送達時，我們將主動通知。</p>
      <h4 class="font-bold text-xl mb-2">商品到貨日期 / 時間</h4>
      <p class="md:text-lg text-base pb-4 mb-4 border-b-2">
        出貨後約 3 - 4 個工作天可送達指定地址。<br/>
        如需指定出貨日期，請在備註上註明或來電通知。實際到貨時間依照物流公司安排車趟為主，恕無法指定到貨時段。
      </p>
      <h2 class="font-bold md:text-3xl text-2xl mb-4">退換貨申請</h2>
      <h4 class="font-bold text-xl mb-2">植栽 / 盆栽系列商品</h4>
      <p class="md:text-lg text-base mb-4">
        請於商品送達後 24 小時內致電 02-123426789，請保持商品原狀，我們瞭解詳情後，儘快提供適當的補救措施。
      </p>
      <h4 class="font-bold text-xl mb-2">一般商品</h4>
      <p class="md:text-lg text-base mb-4">
        根據台灣消保法第十九條規範，享有收到商品後隔日起算七天內無條件退換貨的服務，
        且商品退回運費由賣家承擔。請保持商品包裝完整寄回，經賣家確認無誤後，即可申請退款。
      </p>
      <h4 class="font-bold text-xl mb-2">客製化商品</h4>
      <p class="md:text-lg text-base mb-4">客製化商品類型
        <span class="font-bold">不接受客人因個人因素申請退款，</span>
        若有商品瑕疵問題，請保持商品原狀，並於商品送達後 24 小時內致電 02-123426789，
        我們瞭解詳情後，儘快提供適當的補救措施。
      </p>
      <h4 class="font-bold text-xl mb-2">使用折扣代碼退換貨</h4>
      <p class="md:text-lg text-base mb-4">退款金額將依據使用折扣代碼的比例進行退款。</p>
      <p class="md:text-lg text-base mb-16">
        舉例說明：<br/>
        原訂單商品金額 NT$1,000，使用 9 折優惠碼後實際付款金額為 NT$900，因此實際退款金額為 NT$900。
      </p>
      <div class="flex justify-between items-center flex-col md:flex-row">
        <img class="img-size mr-4 mb-8 md:mb-28" src="~@/assets/images/cuate.png" alt="">
        <p class="md:text-lg text-base lg:text-3xl md:text-2xl text-xl font-bold leading-relaxed
        text-center md:text-left mb-12 md:mb-0">
          若有任何相關問題，歡迎來電詢問
          客服專線：02-123426789
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBanner from '@/components/TitleBanner.vue';

export default {
  name: 'Guide',
  data() {
    return {
      title: '退款換貨須知',
      bgImg: './images/banner-1.jpg',
    };
  },
  components: {
    TitleBanner,
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  max-width: 960px;
}
.img-size {
  max-width: 480px;
}

@media screen and (max-width: 1024px) {
  .img-size {
    max-width: 320px;
  }
}
@media screen and (max-width: 480px) {
  .img-size {
    max-width: 240px;
  }
}
</style>
