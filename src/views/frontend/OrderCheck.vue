<template>
  <div class="w-full mx-auto">
    <nav id="navBar" class="xl:px-0 lg:px-8 px-4">
      <div class="relative md:max-w-screen-xl mx-auto
        md:block flex justify-between items-center"
      >
        <div class="flex justify-between items-center">
          <router-link to="/" class="navbar__logo">
            <img src="@/assets/images/logo.svg" alt="" />
          </router-link>
          <a
            href="#"
            class="flex items-center text-gray-600 transition hover:text-secondary-light"
            @click.prevent="loginOpen = !loginOpen"
          >
            <span class="material-icons mr-2"> account_circle </span>
            <span>會員登入</span>
          </a>
        </div>
      </div>
    </nav>
    <transition name="fade">
      <router-view/>
    </transition>
      <footer class="bg-gray-800">
        <div
          class="flex justify-between flex-wrap max-w-screen-xl m-auto
          xl:px-0 lg:px-8 px-4 py-12"
        >
          <div class="flex justify-center sm:justify-between md:justify-start
          flex-col sm:flex-row w-full md:w-auto items-center sm:items-start">
            <div class="footer__logo flex-none mb-6 sm:mr-16 sm:mb-0">
              <img src="@/assets/images/logo.svg" alt="" />
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
    <LoginModal
      :loginopen="loginOpen"
      @loginclose="closeModal"
    />
    <OverlayMask
      :overlayopen="loginOpen"
      @overlayclose="closeModal"
    />
    <ScrollTop />
  </div>
</template>

<script>

import ScrollTop from '@/components/ScrollTop.vue';
import LoginModal from '@/components/Login.vue';
import OverlayMask from '@/components/OverlayMask.vue';

export default {
  name: 'OrderCheck',
  data() {
    return {
      loginOpen: false,
    };
  },
  components: {
    ScrollTop,
    LoginModal,
    OverlayMask,
  },
  methods: {
    closeModal() {
      if (this.loginOpen) this.loginOpen = false;
    },
  },
};
</script>
