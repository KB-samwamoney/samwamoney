<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const userId = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  await authStore.login({ userId: userId.value, password: password.value })

  if (authStore.isLoggedIn) {
    console.log('로그인 성공!')
    router.push('/main')
  } else {
    alert(authStore.errorMessage)
  }
}

const goToPasswordSearch = () => {
  router.push({ name: 'password-search' })
}
const goToSignIn = () => {
  router.push({ name: 'sign-in' })
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleLogin">
      <div class="login-form">
        <h1>로그인</h1>
        <div class="auth-input">
          <input
            v-model="userId"
            type="text"
            placeholder="아이디를 입력해주세요"
            autocomplete="username"
            class="input"
          />
          <input
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            autocomplete="current-password"
            class="input"
          />
        </div>
        <button class="method-button" type="submit">로그인하기</button>
      </div>
    </form>
    <p class="other">
      <span @click="goToPasswordSearch" class="password-search">비밀번호 찾기</span> |
      <span @click="goToSignIn" class="sign-in">회원가입</span>
    </p>
  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  align-items: center;
}

h1 {
  font-size: 60px;
  font-weight: 900;
}

.auth-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  font-family: 'Pretendard';
  color: var(--black);
}

.input {
  width: 400px;
  height: 50px;
  border-radius: var(--radius);
  padding: var(--space-m);
  font-family: 'Pretendard', sans-serif;
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
  border: none;
}

.method-button:hover {
  background-color: var(--baby-pink);
}

.other {
  text-align: end;
  color: var(--dark-gray);
  margin-top: var(--space-m);
}

.password-search {
  cursor: pointer;
}

.password-search:hover {
  color: var(--light-yellow);
}

.sign-in {
  cursor: pointer;
}

.sign-in:hover {
  color: var(--light-yellow);
}
</style>
