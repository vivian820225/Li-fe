<template>
  <div
    class="overlay"
    :class="{'show': overlayopen}"
    @click="overlayClose()">
  </div>
</template>

<script>
export default {
  name: 'OverlayMask',
  props: ['overlayopen'],
  methods: {
    overlayClose() {
      this.$emit('overlayclose');
    },
  },
};
</script>

<style lang="scss">
.overlay {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: 99;
  &.show {
    display: block;
  }
}
</style>
