<script setup>
import LogoImg from '@/assets/img/삼와머니-로고.png'
</script>

<template>
  <div class="header">
    <img :src="LogoImg" alt="로고" />

    <div>
      <button>로그인</button>
      <button>로그아웃</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: var(--light-yellow);
  height: 10vh;
  display: flex;
}

img {
  width: 100px;
}
</style>
