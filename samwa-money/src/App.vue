<script setup>
import Footer from './components/Common/Footer.vue'
import Header from './components/Common/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />
  <RouterView></RouterView>
  <Footer />
</template>

<style scoped></style>
