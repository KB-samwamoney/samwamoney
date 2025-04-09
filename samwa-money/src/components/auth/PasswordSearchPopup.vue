<script setup>
defineProps({
  type: { type: String, default: 'success' },
  name: String,
  password: String,
  message: String,
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="popup-overlay" @click.self="close">
    <div class="popup-box">
      <p v-if="type === 'success'">
        <strong>{{ name }}</strong
        >님의 비밀번호는 <strong>{{ password }}</strong> 입니다.
      </p>
      <p v-else>
        {{ message }}
      </p>
      <button class="confirm-button" @click="close">확인</button>
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
  font-size: 18px;
  width: 60vh;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-xl);
  white-space: pre-line;
}

.confirm-button {
  margin-top: 20px;
  background-color: #f9c542;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 30%;
}
</style>
