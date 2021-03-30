<template>
  <a
    id="scrollTop"
    class="scroll-top"
    href="#"
    @click.prevent="scrollTop()"
  >
    <span class="material-icons"> keyboard_arrow_up </span>
  </a>
</template>

<script>
export default {
  name: 'ScrollTop',
  mounted() {
    const el = document.querySelector('#scrollTop');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  },
  methods: {
    scrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="scss">
.scroll-top {
  @apply bg-gray-500 text-gray-800;
  display: block;
  position: fixed;
  right: 0;
  bottom: 150px;
  padding: 0.75rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  box-shadow: 0 2px 6px rgba(53, 53, 53, 0.2);
  transform: translateX(200px);
  transition: transform 0.3s ease-in-out;
  z-index: 20;
  cursor: pointer;
  &.active {
    transform: translateX(0);
  }
  span {
    display: block;
    font-size: 1.75rem;
  }
}

@media screen and (max-width: 768px) {
  .scroll-top {
    padding: .5rem;
    bottom: 48px;
  }
}
</style>
