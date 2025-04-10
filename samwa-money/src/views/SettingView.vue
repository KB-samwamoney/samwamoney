<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/stores/settingStore'
import SideBar from '@/components/sidebar/SideBar.vue'
import { useToastStore } from '@/stores/toastStore.js'

const router = useRouter()
const toastStore = useToastStore()
const settingStore = useSettingStore()

const selectedMode = ref('light')

onMounted(async () => {
  try {
    await settingStore.loadSetting()
    selectedMode.value = settingStore.mode
  } catch (error) {
    console.error('설정 불러오기 실패:', error)
  }
})

const saveMode = async () => {
  try {
    await settingStore.saveMode(selectedMode.value)
    toastStore.showToast('모드가 변경되었습니다.', 'success')
  } catch (error) {
    console.error(error)
    toastStore.showToast('모드 변경에 실패했습니다. 다시 시도해주세요.', 'error')
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="main-body">
    <div class="side-bar">
      <SideBar />
    </div>
    <div class="container">
      <h1>환경 설정</h1>
      <h2 class="section-title">모드 설정</h2>
      <hr class="divider" />
      <div class="card-wrapper">
        <div
          class="light-mode-card"
          :class="{ active: selectedMode === 'light' }"
          @click="selectedMode = 'light'"
        >
          <h3>🌞 신체 모드</h3>
          <p>밝고 따뜻한 테마</p>
        </div>
        <div
          class="dark-mode-card"
          :class="{ active: selectedMode === 'dark' }"
          @click="selectedMode = 'dark'"
        >
          <h3>🌙 내장 모드</h3>
          <p>차분하고 눈에 편한 테마</p>
        </div>
      </div>
      <div class="action-buttons">
        <button class="go-back" @click="goBack">뒤로</button>
        <button class="save-button" @click="saveMode">저장</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-body {
  display: flex;
  flex: 1;
  background-color: var(--light-white);
}

.side-bar {
  width: 300px;
  background-color: var(--lighter-yellow);
}

.container {
  width: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--space-l);
  margin-bottom: var(--space-l);
}

h1 {
  font-size: 50px;
  font-weight: 900;
}

.section-title {
  align-self: flex-start;
  font-size: 25px;
  font-weight: 800;
  padding-left: var(--space-s);
}

.divider {
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--dark-gray);
  margin-bottom: var(--space-l);
}

.card-wrapper {
  display: flex;
  gap: 100px;
  margin-top: 100px;
  margin-bottom: 100px;
  flex-wrap: wrap;
  justify-content: center;
}

.light-mode-card {
  width: 220px;
  height: 160px;
  padding: var(--space-m);
  border-radius: var(--radius);
  border: 2px solid var(--light-gray);
  background-color: var(--light-white);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.light-mode-card h3 {
  font-size: 22px;
  margin-bottom: var(--space-s);
}

.light-mode-card p {
  font-size: 16px;
  color: var(--dark-gray);
}

.light-mode-card:hover {
  transform: translateY(-3px);
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
}

.light-mode-card.active {
  border-color: var(--danger);
  background-color: var(--light-yellow);
}

.dark-mode-card {
  width: 220px;
  height: 160px;
  padding: var(--space-m);
  border-radius: var(--radius);
  border: 2px solid var(--light-gray);
  background-color: var(--light-white);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.dark-mode-card h3 {
  font-size: 22px;
  margin-bottom: var(--space-s);
}

.dark-mode-card p {
  font-size: 16px;
  color: var(--dark-gray);
}

.dark-mode-card:hover {
  transform: translateY(-3px);
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
}

.dark-mode-card.active {
  border-color: var(--dark-gray);
  background-color: var(--black);
  color: var(--white);
}

.save-button {
  background-color: var(--danger);
  color: var(--light-white);
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

.save-button:hover {
  transform: translateY(-2px);
}

.action-buttons {
  display: flex;
  gap: var(--space-m);
  margin-top: var(--space-l);
  justify-content: center;
}

.go-back {
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

.go-back:hover {
  transform: translateY(-2px);
}
</style>
