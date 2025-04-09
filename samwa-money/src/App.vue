<script setup>
import Footer from './components/Common/Footer.vue'
import Header from './components/Common/Header.vue'
import { RouterView } from 'vue-router'
import ToastNotification from './components/toast/ToastNotification.vue';
</script>

<template>
  <Header />
  <RouterView></RouterView>
  <ToastNotification />
  <Footer />
</template>

<style scoped></style>
