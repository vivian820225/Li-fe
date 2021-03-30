<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4 mb-8 md:mb-16 text-center">
    <StepsBar :steps="steps" class="max-w-screen-md mx-auto mb-8" />
    <div class="bg-succeed">
      <p class="font-bold md:text-2xl text-xl">
        您的訂單已順利完成<br/>
        謝謝您的購買
      </p>

    </div>
    <router-link
      class="btn w-64 bg-primary-default hover:bg-primary-dark transition"
      to="/"
    >
      回首頁
    </router-link>
  </div>
</template>

<script>
import StepsBar from '@/components/frontend/order/StepsBar.vue';

export default {
  name: 'OrderAccepted',
  data() {
    return {
      steps: [
        {
          id: 1,
          title: '確認訂單資訊',
          done: true,
        },
        {
          id: 2,
          title: '訂單成立',
          done: true,
        },
      ],
    };
  },
  components: {
    StepsBar,
  },
};
</script>

<style lang="scss" scoped>
  .bg-succeed {
    max-width: 480px;
    margin: 4rem auto;
    padding-top: 12rem;
    padding-bottom: 4rem;
    background-image: url('~@/assets/images/order-completed.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center top;
  }
  @media screen and (max-width: 768px) {
    .bg-succeed {
      margin: 2rem auto;
      padding-top: 8rem;
      padding-bottom: 1rem;
    }
  }
</style>
