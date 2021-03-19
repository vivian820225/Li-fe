<template>
  <div class="w-full mx-auto">
    <Navbar />
    <transition name="fade">
      <router-view/>
    </transition>
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ScrollTop from '@/components/ScrollTop.vue';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  components: {
    Navbar,
    Footer,
    ScrollTop,
  },
};
</script>
