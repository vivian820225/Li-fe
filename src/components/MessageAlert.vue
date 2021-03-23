<template>
  <div class="alert-position">
    <div
      v-for="(item, i) in messages"
      :key="i"
      :id="`message-alert_${i}`"
      class="message-alert"
      :class="`message-alert__${ item.status }`"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-autohide="false"
    >
      <p>
        {{ item.message }}
      </p>
      <button
        type="button"
        aria-label="Close"
        class="alert-close-btn"
        @click="removeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageAlert',
  data() {
    return {
      messages: [],
    };
  },
  created() {
    this.$bus.$on('message:push', (message, status = 'warning') => {
      this.updateMessage(message, status);
    });
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessageWithTiming(timestamp) {
      setTimeout(() => {
        this.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            this.messages.splice(i, 1);
          }
        });
      }, 3000);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
  .alert-position {
    min-width: 280px;
    position: fixed;
    right: 1rem;
    top: 1rem;
    z-index: 10000;
  }
  .message-alert {
    @apply py-3 px-5 mb-4  text-sm rounded-md border
    flex items-center justify-between;
    &__warning {
      @apply bg-yellow-100 text-yellow-900 border-yellow-200;
    }
    &__success {
      @apply bg-green-100 text-green-900 border-green-200;
    }
    &__danger {
      @apply bg-red-100 text-red-900 border-red-200;
    }
  }
</style>
