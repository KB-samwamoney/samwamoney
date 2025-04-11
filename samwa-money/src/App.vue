<script setup>
import Footer from './components/Common/Footer.vue'
import Header from './components/Common/Header.vue'
import { RouterView } from 'vue-router'
import ToastNotification from './components/toast/ToastNotification.vue'
</script>

<template>
  <div class="wrapper">
    <Header />
    <main class="content">
      <RouterView :key="$route.fullPath" />
      <ToastNotification />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>
