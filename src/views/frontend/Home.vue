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
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';
import ScrollTop from '@/components/frontend/ScrollTop.vue';

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
  created() {
    this.$store.dispatch('productsModules/getAllProducts');
  },
};
</script>
