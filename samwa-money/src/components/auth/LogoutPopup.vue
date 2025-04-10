<script setup>
defineProps({
  message: String,
})

const emit = defineEmits(['confirm', 'close'])

const handleConfirm = () => emit('confirm')
const handleClose = () => emit('close')
</script>

<template>
  <div class="popup-overlay" @click.self="handleClose">
    <div class="popup-box">
      <p>{{ message }}</p>
      <div class="button-group">
        <button class="cancel" @click="handleClose">취소</button>
        <button class="confirm" @click="handleConfirm">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-box {
  background-color: white;
  border-radius: 12px;
  padding: 30px 40px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  width: 60vh;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-xl);
  white-space: pre-line;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.confirm,
.cancel {
  padding: 10px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  width: 100px;
  font-family: 'Pretendard', sans-serif;
  font-size: 15px;
}

.confirm {
  background-color: #f9c542;
}

.cancel {
  background-color: #ccc;
}
</style>
