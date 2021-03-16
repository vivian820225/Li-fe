<template>
  <div class="w-full mx-auto">
    <h1>Welcome</h1>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
};
</script>
