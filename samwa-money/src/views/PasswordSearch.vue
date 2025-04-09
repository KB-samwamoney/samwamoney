<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import PasswordSearchPopup from '@/components/auth/PasswordSearchPopup.vue'

const authStore = useAuthStore()

const name = ref('')
const userId = ref('')
const showPassword = ref('')
const showPopup = ref(false)

// ✅ 비밀번호 찾기 함수
const searchPassword = async () => {
  await authStore.passwordCheck({ name: name.value.trim(), userId: userId.value.trim() })

  if (authStore.errorMessage) {
    alert(authStore.errorMessage)
  } else {
    showPassword.value = authStore.foundedpassword
    showPopup.value = true // ✅ 이걸로 팝업 띄우기!
  }
}
</script>

<template>
  <div class="container">
    <h1>비밀번호 찾기</h1>

    <form @submit.prevent="searchPassword">
      <div class="auth-input">
        <label for="name">이름</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="이름을 입력해주세요"
          class="input"
        />

        <label for="userId">아이디</label>
        <input
          id="userId"
          v-model="userId"
          type="text"
          autocomplete="username"
          placeholder="아이디를 입력해주세요"
          class="input"
        />
      </div>

      <button class="method-button" type="submit">찾기</button>
    </form>
  </div>
  <PasswordSearchPopup
    v-if="showPopup"
    :password="showPassword"
    :name="name"
    @close="showPopup = false"
  />
</template>

<style scoped>
.container {
  width: 800px;
  min-height: 74vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--space-xl);
  gap: var(--space-xl);
}

h1 {
  font-size: 50px;
  font-weight: 900;
}

.auth-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
}

.input {
  width: 400px;
  height: 50px;
  border-radius: var(--radius);
  padding: var(--space-m);
  margin-bottom: var(--space-l);
}

.method-button {
  background-color: var(--light-yellow);
  width: 400px;
  height: 50px;
  padding: var(--space-m);
  box-shadow: var(--space-s);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: var(--space-m);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-xl);
}
</style>
