<template>
  <div
    :id="groupId + '-' + item.id"
    class="accordion-item"
    :class="{ 'is-active': item.active }"
  >
    <dt class="accordion-item-title">
      <button @click="toggle" class="accordion-item-trigger">
        <h4 class="accordion-item-title-text">{{ item.title }}</h4>
        <span class="accordion-item-trigger-icon"></span>
      </button>
    </dt>
    <transition
      name="accordion-item"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <dd v-show="item.active" class="accordion-item-details">
        <div v-html="item.details"
        class="accordion-item-details-inner"></div>
      </dd>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'AccordionItem',
  props: ['item', 'multiple', 'groupId'],
  methods: {
    toggle(event) {
      if (this.multiple) this.item.active = !this.item.active;
      else {
        this.$parent.$children.forEach((item) => {
          const tempItem = item;

          if (tempItem.$el.id === event.currentTarget.parentElement.parentElement.id) {
            tempItem.item.active = !tempItem.item.active;
          } else {
            tempItem.item.active = false;
          }
        });
      }
    },
    startTransition(el) {
      const target = el;
      target.style.height = `${target.scrollHeight}px`;
    },
    endTransition(el) {
      const target = el;
      target.style.height = '';
    },
  },
};
</script>

<style lang="scss">
.accordion-item {
  &.is-active {
    .accordion-item-title {
      background-color: #FFC107;
    }
  }
}
.accordion-item-title {
  position: relative;
  h4 {
    font-size: 1.25rem;
    margin-bottom: 0;
    padding-right: 1.25rem;
  }
}
.accordion-item-trigger,
.accordion-item-details-inner {
  padding: 0.75rem 1.25rem;
}
.accordion-item-trigger {
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
}
.accordion-item-trigger-icon {
  $size: 8px;
  display: block;
  position: absolute;
  top: 0; right: 1.25rem; bottom: 0;
  margin: auto;
  width: $size;
  height: $size;
  border-right: 2px solid #363636;
  border-bottom: 2px solid #363636;
  transform: translateY(-$size / 4) rotate(45deg);
  transition: transform 0.2s ease;
  .is-active & {
    transform: translateY($size / 4) rotate(225deg);
  }
}
.accordion-item-details {
  overflow: hidden;
  background-color: whitesmoke;
}
.accordion-item-enter-active, .accordion-item-leave-active {
  will-change: height;
  transition: height 0.2s ease;
}
.accordion-item-enter, .accordion-item-leave-to {
  height: 0 !important;
}
</style>
