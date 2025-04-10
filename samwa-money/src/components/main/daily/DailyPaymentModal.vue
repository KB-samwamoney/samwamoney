<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-box">
      <div class="modal-header">
        <img :src="logo" alt="로고" class="logo" />
        <h2>{{ formattedDate }}</h2>
      </div>

      <div class="modal-body">
        <DailyPaymentList :items="items" :date="date" />
        <div class="button-wrapper">
          <button class="modal-button" @click="closeModal">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/img/삼와머니-로고.png'
import { computed } from 'vue'
import DailyPaymentList from './DailyPaymentList.vue'

const props = defineProps({
  isOpen: Boolean,
  date: String,
  items: Array,
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const formattedDate = computed(() => {
  if (!props.date) return ''
  const date = new Date(props.date)
  date.setDate(date.getDate() + 1)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  })
})
</script>

<style scoped>
.logo {
  width: 70px;
  height: auto;
  margin-left: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-header {
  background-color: var(--light-yellow);
  padding: 1rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 80px;
  overflow: hidden;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
}
.modal-header h2 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
  margin: 0;
}
.modal-content {
  padding: 1rem;
}
.modal-box {
  background: #fff9ef;
  border-radius: 10px;
  width: 500px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.modal-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}
.modal-button {
  background: var(--light-yellow);
  padding: 0.6rem 2rem;
  border: none;
  border-radius: var(--radius);
  font-weight: bold;
  cursor: pointer;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
}
</style>
