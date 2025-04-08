<script setup>
import Footer from './components/Common/Footer.vue'
import Header from './components/Common/Header.vue'
</script>

<template>
  <div class="container">
    <Header></Header>
    <RouterView />
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
