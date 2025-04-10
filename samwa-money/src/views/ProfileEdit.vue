<script setup>
import { useToastStore } from '@/stores/toastStore.js'
import ToastNotification from '@/components/toast/ToastNotification.vue'
import { useAuthStore } from '@/stores/authStore.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const user = ref({ ...authStore.user })
const toastStore = useToastStore()

const handleUpdate = async () => {
  const success = await authStore.updateUserInfo(user.value)

  if (success) {
    toastStore.showToast('회원정보가 수정되었습니다!', 'success')
    setTimeout(() => {
      router.push('/my-page')
    }, 1000)
  } else {
    toastStore.showToast('수정 실패: ' + authStore.errorMessage, 'error')
  }
}
</script>

<template>
  <div class="container">
    <h1>회원 정보 수정</h1>

    <form @submit.prevent="handleUpdate" class="edit-form">
      <label>비밀번호</label>
      <input v-model="user.password" type="password" />

      <label>이메일</label>
      <input v-model="user.email" type="email" />

      <label>닉네임</label>
      <input v-model="user.nickname" type="text" />

      <label>목표 지출</label>
      <input v-model="user.expense_limit" type="text" />

      <button type="submit" class="submit-btn">수정 완료</button>
    </form>
    <ToastNotification
      :message="toastMessage"
      :type="toastType"
      :isVisible="toastVisible"
      @close="toastVisible = false"
    />
  </div>
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

.edit-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  width: 400px;
  margin-top: var(--space-l);
}

.edit-form input {
  height: 45px;
  padding: 0 12px;
  border-radius: var(--radius);
  border: 1px solid #ddd;
}

.submit-btn {
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
  margin-top: var(--space-l);
}
</style>
