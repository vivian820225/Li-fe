<template>
  <footer class="bg-gray-800">
    <div class="flex justify-between flex-wrap max-w-screen-xl m-auto xl:px-0 lg:px-8 px-4 py-10">
      <div class="flex justify-center sm:justify-between md:justify-start
      flex-col sm:flex-row w-full md:w-auto items-center sm:items-start">
        <div class="footer__logo flex-none mb-6 sm:mr-16 sm:mb-0">
          <img src="@/assets/images/logo.svg" alt="" />
        </div>
        <div class="flex text-sm">
          <ul class="text-white mr-12 flex-none">
            <li class="block mb-3 text-gray-400">購買</li>
            <li class="block mb-3">
              <router-link class="hover:text-primary-light" to="/products">產品總覽</router-link>
            </li>
            <li class="block mb-3">
              <router-link class="hover:text-primary-light" to="/discount">優惠活動</router-link>
            </li>
            <li class="block mb-3">
              <router-link class="hover:text-primary-light" to="/account">會員專區</router-link>
            </li>
          </ul>
          <ul class="text-white mr-12 flex-none">
            <li class="block mb-3 text-gray-400">關於</li>
            <li class="block mb-3">
              <router-link class="hover:text-primary-light" to="/blog">綠色生活</router-link>
            </li>
            <li class="block mb-3">
              <router-link class="hover:text-primary-light" to="/about">品牌故事</router-link>
            </li>
            <li class="block mb-3">
              <router-link class="hover:text-primary-light" to="/about">聯絡我們</router-link>
            </li>
          </ul>
          <ul class="text-white md:mr-12 flex-none">
            <li class="block mb-3 text-gray-400">幫助</li>
            <li class="block mb-3">
              <router-link class="hover:text-primary-light" to="/guide">退款換貨須知</router-link>
            </li>
            <li class="block mb-3">
              <router-link class="hover:text-primary-light" to="/">賣家專區</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__author">
        <ul class="text-white text-sm leading-6">
          <li class="flex md:justify-start md:mb-6 mb-4 justify-center">
            <a href="#" class="mr-4">
              <i class="social-media">
                <img src="@/assets/images/icon/github.svg" alt="">
              </i>
            </a>
            <a href="#">
              <i class="social-media">
                <img src="@/assets/images/icon/linkedIn.svg" alt="">
              </i>
            </a>
          </li>
          <li>
            <h6 class="copyright">
              © 2021 Li-fe. All Rights Reserved.<br/>
              僅作為練習使用，無任何商業用途
            </h6>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
.footer__logo {
  height: 2rem;
  img {
    width: auto;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .footer__author {
    width: 100%;
    margin-top: 1rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, .5);
    text-align: center;
  }
}
</style>
