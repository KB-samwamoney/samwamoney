<script setup>
import KidneyImg from '@/assets/img/콩팥이.png'
import SadKidneyImg from '@/assets/img/슬픈콩팥이.png'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()

console.log(authStore.user.expense_limit)
</script>

<template>
  <div class="container">
    <p class="speech-bubble">멘트 띄울거에요~~~~</p>
    <img :src="KidneyImg" alt="콩팥" class="kidney" />
    <img :src="SadKidneyImg" alt="콩팥" class="sad-kidney" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: var(--space-m);
}

.kidney {
  width: 5%;
}

.sad-kidney {
  width: 6%;
}

.speech-bubble {
  position: relative;
  background-color: var(--light-yellow);
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 200px;
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--black);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.speech-bubble::before {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 8px 0 8px 10px;
  border-style: solid;
  border-color: transparent transparent transparent var(--light-yellow);
}
</style>
