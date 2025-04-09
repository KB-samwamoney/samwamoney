<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const buttonClass = ref(false)

const goToPayMentadd = () => {
  router.push({ name: 'payment-add' })
}
</script>

<template>
  <div><button :class="buttonClass ? 'circle-plus-button' : 'plus-button'" @click="goToPayMentadd">+</button></div>

</template>

<style scoped>
.plus-button {
  background-color: #FFE596;
  width: 237px;
  height: 52px;
  font-size: 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2)
}

.circle-plus-button {
  background-color: #FFE596;
  width: 52px;
  height: 52px;
  font-size: 24px;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2)
}
</style>
