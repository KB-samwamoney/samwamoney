<script setup>
import LogoutPopup from '@/components/auth/LogoutPopup.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const authStore = useAuthStore()
const showLogoutConfirm = ref(false)

const formatDate = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}

const handleLogout = () => {
  showLogoutConfirm.value = true
}

const goToGoodBye = () => {
  router.push({
    path: '/good-bye',
    query: { nickname: authStore.user.nickname },
  })
}

const confirmLogout = () => {
  authStore.logout()
  router.push('/')
}

const goBack = () => {
  router.back()
}

const goToEdit = () => {
  router.push('/profile-edit')
}
</script>

<template>
  <div class="container">
    <h1>뇌 센터</h1>
    <h2 class="section-title">뇌 정보</h2>
    <hr class="divider" />
    <div class="info-body">
      <div class="info">
        <span class="title">아이디</span>
        <span class="content">{{ authStore.user.userId }}</span>
      </div>
      <div class="info">
        <span class="title">비밀번호</span>
        <span class="content">{{ authStore.user.password }}</span>
      </div>
      <div class="info">
        <span class="title">닉네임</span>
        <span class="content">{{ authStore.user.nickname }}</span>
      </div>
      <div class="info">
        <span class="title">이번 달 목표 지출액</span>
        <span class="content">{{ authStore.user.expense_limit.toLocaleString() }}</span>
      </div>
      <div class="info">
        <span class="title">가입일</span>
        <span class="content">{{ formatDate(authStore.user.join_date) }}</span>
      </div>
    </div>
    <h2 class="section-title">뇌 탈출하기</h2>
    <hr class="divider" />
    <div class="method">
      <span class="title" @click="handleLogout">로그아웃</span>
    </div>
    <div class="method">
      <span class="title delete" @click="goToGoodBye">회원탈퇴</span>
    </div>
    <div class="action-buttons">
      <button type="button" class="go-back" @click="goBack">뒤로가기</button>
      <button type="button" class="go-edit" @click="goToEdit">수정하기</button>
    </div>
  </div>
  <LogoutPopup
    v-if="showLogoutConfirm"
    message="정말로 로그아웃 하시겠습니까?"
    @confirm="confirmLogout"
    @close="showLogoutConfirm = false"
  />
</template>

<style scoped>
.container {
  width: 100vh;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--space-xl);
}

h1 {
  font-size: 50px;
  font-weight: 900;
}

.info-body {
  width: 100vh;
}

.info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-l);
}

.title {
  font-size: 25px;
  font-weight: 700;
}

.content {
  font-size: 20px;
  font-weight: 500;
}

.section-title {
  align-self: flex-start;
  font-size: var(--space-l);
  font-weight: 800;
}

.divider {
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--dark-gray);
  margin-bottom: var(--space-l);
}

.method {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: var(--space-m);
}

.delete {
  color: var(--danger);
}

.method .title {
  cursor: pointer;
  transition:
    color 0.3s ease,
    transform 0.2s ease;
}

.method .title:hover {
  color: var(--light-yellow);
  transform: translateX(5px);
}

.action-buttons {
  display: flex;
  gap: var(--space-m);
  margin-top: var(--space-l);
  justify-content: center;
}

.go-back,
.go-edit {
  background-color: var(--light-yellow);
  color: var(--black);
  font-size: var(--space-m);
  font-weight: 700;
  border: none;
  border-radius: var(--radius);
  padding: var(--space-m) var(--space-l);
  cursor: pointer;
  box-shadow: var(--space-s);
  transition: all 0.2s ease;
  font-family: 'Pretendard', sans-serif;
}

.go-edit {
  background-color: var(--danger);
  color: var(--light-white);
}

.go-back:hover,
.go-edit:hover {
  transform: translateY(-2px);
}
</style>
