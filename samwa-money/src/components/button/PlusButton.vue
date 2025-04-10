<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
  circle: Boolean, // 부모 컴포넌트에서 제어
})

const goToPayMentadd = () => {
  router.push({ name: 'payment-add' })
}
</script>

<template>
  <button :class="circle ? 'circle-plus-button' : 'plus-button'" @click="goToPayMentadd">+</button>
</template>

<style scoped>
.plus-button {
  background-color: var(--light-yellow);
  width: 237px;
  height: 52px;
  font-size: 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.circle-plus-button {
  background-color: var(--real-yellow);
  width: 52px;
  height: 52px;
  font-size: 24px;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
