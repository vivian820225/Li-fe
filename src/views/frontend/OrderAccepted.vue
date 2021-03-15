<template>
  <div class="max-w-screen-xl mx-auto xl:px-0 lg:px-8 px-4">
    <p>
      您的訂單已順利完成<br/>
      謝謝您的購買
    </p>
    <router-link
      class="btn bg-primary-default"
      to="/">
      回首頁
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'OrderAccepted',
};
</script>
