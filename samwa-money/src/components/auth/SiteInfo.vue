<script setup>
import textImg from '@/assets/img/삼와머니.png'
import KidneyImg from '@/assets/img/콩팥이.png'
</script>

<template>
  <div class="site-info">
    <img :src="KidneyImg" alt="콩팥" class="kidney" />
    <img :src="textImg" alt="삼와머니" class="text" />
    <p>💰 너... 지갑 아직 살아있어? 💰</p>
    <p class="caption">
      콩팥이가 지켜주는 간편한 가계부,
      <img :src="textImg" alt="삼와머니" class="text-img" />!
    </p>
  </div>
</template>

<style scoped>
.site-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.kidney {
  width: 25%;
}

.text {
  width: 35%;
  margin-bottom: var(--space-l);
}

.caption {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em; /* 텍스트와 이미지 사이 간격 */
  flex-wrap: wrap;
}

.text-img {
  width: 12%;
  display: inline;
}
</style>
