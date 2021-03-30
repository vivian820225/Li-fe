<template>
  <div>
    <div class="max-w-screen-xl mx-auto font-sans xl:px-0 lg:px-8 px-4">
      <BannerCarousel class="mb-16" />
      <section class="lg:mb-40 md:mb-24 mb-12">
        <div class="flex justify-between items-end mb-4">
          <h2 class="section-title">
            綠色生活
            <span class="sub-section-title"
              >Green Life</span
            >
          </h2>
          <p class="flex items-center text-gray-500">
            共 12 篇文章，顯示 1 - 9 項
          </p>
        </div>
        <div class="grid md:grid-flow-col md:grid-cols-3 sm:grid-cols-2 md:gap-8 sm:gap-6 gap-4">
          <ArticleCard :article=article v-for="(article, id) in articles" :key="id" />
        </div>
      </section>
      <!-- <Pagination
        class=""
        :pages="pagination"
        @updateList="getProducts()"
      /> -->
    </div>
    <!-- 訂閱我們 -->
    <section class="contact-us bg-gray-100 md:py-24 py-16 px-4 md:px-8">
      <div
        class="relative max-w-screen-xl mx-auto font-sans
        grid grid-flow-col md:grid-cols-2"
      >
        <div class="block">
          <h2 class="section-title md:mb-12 mb-4">
            訂閱我們
            <span class="sub-section-title"
              >Subscribe Us</span
            >
          </h2>
          <p class="md:text-2xl text-xl font-bold mb-4">
            歡迎訂閱我們，即刻取得相關資訊<br />一同豐富您的綠色生活！
          </p>
          <div class="flex w-full mb-4">
            <input
              type="email"
              class="w-3/4 block border-2 border-primary-default rounded-tl-lg rounded-bl-lg
              focus:border-primary-dark focus:ring-4 focus:ring-primary-default
              focus:ring-opacity-50 outline-none"
              placeholder="example@service.com"
            />
            <button type="submit" class="btn btn__inline bg-primary-default">訂閱</button>
          </div>
          <span class="text-sm text-gray-500">
            *訂閱即代表你同意我們的
            <a href="#" class="underline">使用者條款</a>
            和
            <a href="#" class="underline">隱私權保護政策</a>
          </span>
        </div>
        <div class="hidden md:block relative lg:-top-40 md:-top-20">
          <img class="absolute right-0" src="~@/assets/images/contact_us.png" alt="">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BannerCarousel from '@/components/frontend/home/BannerCarousel.vue';
import ArticleCard from '@/components/frontend/ArticleCard.vue';
// import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Blog',
  data() {
    return {
      pagination: {},
      articles: [
        {
          id: 1,
          title: '1 減塑追踪（Green Tracker）美食外送業者如何為環境永續性盡一份心力',
          imgUrl: '~@/assets/images/product.jpg',
          description: '當餐廳捨棄可重複使用的內用瓷盤等餐具，而改用外帶塑膠餐具，導致外帶塑膠餐具丟棄量...',
          linkUrl: '#',
        },
        {
          id: 2,
          title: '2 減塑追踪（Green Tracker）美食外送業者如何為環境永續性盡一份心力',
          imgUrl: '~@/assets/images/product.jpg',
          description: '當餐廳捨棄可重複使用的內用瓷盤等餐具，而改用外帶塑膠餐具，導致外帶塑膠餐具丟棄量...',
          linkUrl: '#',
        },
        {
          id: 3,
          title: '3 減塑追踪（Green Tracker）美食外送業者如何為環境永續性盡一份心力',
          imgUrl: '~@/assets/images/product.jpg',
          description: '當餐廳捨棄可重複使用的內用瓷盤等餐具，而改用外帶塑膠餐具，導致外帶塑膠餐具丟棄量...',
          linkUrl: '#',
        },
      ],
    };
  },
  components: {
    BannerCarousel,
    ArticleCard,
  },
};
</script>
