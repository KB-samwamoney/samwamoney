<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const nickname = route.query.nickname || '콩팥이'
const isAgreed = ref(false)

const handleWithdraw = async () => {
  if (!isAgreed.value) {
    alert('탈퇴에 동의하셔야 탈출이 가능합니다')
    return
  }

  const confirmDelete = confirm(`${nickname}님 정말 탈퇴하시겠습니까?`)
  if (!confirmDelete) return

  await authStore.withdraw()
  alert(`${nickname}님 탈퇴되었습니다. 안녕히 가세요`)
  router.push('/')
}
</script>

<template>
  <div class="container">
    <h1>콩팥이와 이별하기</h1>

    <p class="content">{{ nickname }}님 정말 가실 건가요...? 콩팥이가 울고 있어요 💦</p>
    <p class="content">지금 탈퇴하시면 모든 정보를 잃을 수 있어요 ㅠㅠ</p>

    <div class="agree-box">
      <input type="checkbox" id="agree" v-model="isAgreed" />
      <label for="agree">위 내용을 확인했고, 탈퇴에 동의합니다.</label>
    </div>

    <button class="withdraw-button" @click="handleWithdraw" :disabled="!isAgreed">탈출</button>
  </div>
</template>

<style scoped>
.container {
  width: 100vh;
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: var(--space-xl);
}

h1 {
  font-size: 50px;
  font-weight: 900;
  margin-bottom: var(--space-xl);
}

.withdraw-button {
  background-color: var(--light-yellow);
  width: 400px;
  height: 50px;
  padding: var(--space-m);
  margin: var(--space-m) 0;
  box-shadow: var(--space-s);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 20px;
  font-weight: 700;
  color: var(--danger);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.content {
  font-size: 25px;
  margin: var(--space-m) 0;
}

.agree-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: var(--space-m) 0;
  font-size: 18px;
  font-weight: 500;
}

.withdraw-button:disabled {
  background-color: var(--light-gray);
  cursor: not-allowed;
  color: var(--dark-gray);
  box-shadow: none;
}
</style>
