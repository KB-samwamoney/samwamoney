<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  name: String,
})

const handleEvent = () => {
  if (props.name === '확인') {
    router.back()
  }
  if (props.name === '수정') {
    router.push({ name: 'payment-update' })
  }
  if (props.name === '완료') {
    // console.log(`${props.name}`)
  }
  if (props.name === '취소') {
    router.push({ name: 'main' })
  }
}
</script>

<template>
  <button class="button" @click="handleEvent">{{ props.name }}</button>
</template>

<style scoped>
.button {
  background-color: var(--light-yellow);
  width: 140px;
  height: 40px;
  font-size: 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
