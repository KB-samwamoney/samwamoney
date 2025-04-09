<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const userId = ref('')
const password = ref('')
const passwordConfirm = ref('')
const name = ref('')
const email = ref('')
const nickname = ref('')
const expense = ref('')

// 이메일 정규식
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 비밀번호 정규식: 8~20자 내
const passwordRegex = /^.{8,20}$/

const handleSignin = async () => {
  if (!emailRegex.test(email.value)) {
    alert('유효한 이메일 형식이 아닙니다.')
    return
  }

  if (!passwordRegex.test(password.value)) {
    alert('비밀번호는 8~20자여야 합니다.')
    return
  }

  if (password.value !== passwordConfirm.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  const newUser = {
    userId: userId.value,
    password: password.value,
    name: name.value,
    email: email.value,
    nickname: nickname.value,
    expense_limit: expense.value,
  }

  await authStore.register(newUser)

  if (authStore.isLoggedIn) {
    alert('회원가입이 완료되었습니다!')
    router.push('/')
  } else {
    alert(authStore.errorMessage)
  }
}
</script>

<template>
  <div class="container">
    <h1>회원가입</h1>
    <form @submit.prevent="handleSignin">
      <div class="auth-input">
        <label for="userId">아이디</label>
        <input
          id="userId"
          v-model="userId"
          type="text"
          autocomplete="username"
          placeholder="아이디를 입력해주세요"
          class="input"
        />

        <label for="password">비밀번호</label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="new-password"
          placeholder="8~20자 이상 입력하세요"
          class="input"
        />

        <label for="passwordConfirm">비밀번호 확인</label>
        <input
          id="passwordConfirm"
          v-model="passwordConfirm"
          type="password"
          autocomplete="new-password"
          placeholder="비밀번호를 다시 입력해주세요"
          class="input"
        />

        <label for="name">이름</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="이메일을 입력해주세요"
          class="input"
        />

        <label for="email">이메일</label>
        <input
          id="email"
          v-model="email"
          type="text"
          placeholder="이름을 입력해주세요"
          class="input"
        />

        <label for="nickname">닉네임</label>
        <input
          id="nickname"
          v-model="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          class="input"
        />
        <span class="nickname-explain">캐릭터의 이름으로 설정됩니다.</span>

        <label for="expense">한 달 간 목표 지출</label>
        <input
          id="expense"
          v-model="expense"
          type="text"
          placeholder="한 달 간 목표 지출을 입력해주세요"
          class="input"
        />
      </div>
      <button class="method-button" type="submit">회원가입</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  width: 800px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--space-l);
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
}

.nickname-explain {
  font-size: 12px;
  margin-left: var(--space-s);
  margin-bottom: 5px;
}

.auth-input .input:last-of-type {
  background-color: var(--baby-pink);
  margin-bottom: var(--space-l);
}
</style>
