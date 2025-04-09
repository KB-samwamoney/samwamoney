<script setup>
import LogoImg from '@/assets/img/삼와머니-로고.png'
import { ref } from 'vue'

const goTohome = () => {}
</script>

<template>
  <div class="header">
    <img :src="LogoImg" alt="로고" @click="goTohome" />
    <div>
      <button>로그인</button>
      <button>로그아웃</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: var(--light-yellow);
  display: flex;
  padding: 0 var(--space-l);
  justify-content: space-between;
  align-content: center;
}

img {
  width: 125px;
}
</style>
