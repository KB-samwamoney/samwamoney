<script setup>
const props = defineProps({
  show: Boolean,
  message: String,
})

const emit = defineEmits(['confirm', 'cancel', 'create-payment'])

const confilm = () => {
  emit('confirm', 'create-payment')
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <p class="modal-text">{{ props.message }}</p>
      <div class="modal-buttons">
        <button class="btn cancel" @click="cancel">취소</button>
        <button class="btn confirm" @click="confilm">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.modal {
  background: var(--light-white);
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.modal-text {
  font-size: 18px;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
}

.btn {
  width: 100px;
  height: 40px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.btn.cancel {
  background-color: var(--light-yellow);
}

.btn.confirm {
  background-color: var(--light-yellow);
}
</style>
