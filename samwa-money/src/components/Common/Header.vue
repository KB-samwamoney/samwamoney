<script setup>
import LogoImg from '@/assets/img/삼와머니-로고.png'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const goToHome = () => {
  router.push('/')
}

const goToLogin = () => {
  router.push('/auth')
}

const goToSignup = () => {
  router.push('/sign-in')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/auth')
}
</script>

<template>
  <div class="header">
    <img :src="LogoImg" alt="로고" @click="goToHome" />
    <div class="nav-buttons">
      <template v-if="!authStore.isLoggedIn">
        <button @click="goToLogin">로그인</button>
        <button @click="goToSignup">회원가입</button>
      </template>
      <template v-else>
        <button @click="handleLogout">로그아웃</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: var(--light-yellow);
  display: flex;
  padding: 0 var(--space-l);
  justify-content: space-between;
  align-items: center;
}

img {
  width: 125px;
  cursor: pointer;
}

.nav-buttons {
  display: flex;
  gap: var(--space-s);
}

button {
  background-color: var(--light-white);
  border: 1px solid var(--light-yellow);
  border-radius: var(--radius);
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Pretendard';
  color: var(--black);
}
</style>
