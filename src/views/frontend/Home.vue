<template>
  <div class="w-full mx-auto">
    <a class="go-top" @click.prevent="scrollTop">
      <span class="material-icons">
        keyboard_arrow_up
      </span>
    </a>
    <Navbar class="md:max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4" />
    <transition name="fade"><router-view /></transition>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import $ from 'jquery';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    scrollTop() {
      $('html, body').animate({ scrollTop: 0 }, 1000);
    },
  },
};
</script>
