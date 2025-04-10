<script setup>
import { ref } from 'vue'
import { useSettingStore } from '@/stores/settingStore'
import SideBar from '@/components/sidebar/SideBar.vue'

const settingStore = useSettingStore()
const selectedMode = ref(settingStore.mode)

const saveMode = () => {
  settingStore.mode = selectedMode.value
  alert('모드가 변경되었습니다.')
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
          class="mode-card"
          :class="{ active: selectedMode === 'light' }"
          @click="selectedMode = 'light'"
        >
          <h3>🌞 신체 모드</h3>
          <p>밝고 따뜻한 테마</p>
        </div>
        <div
          class="mode-card"
          :class="{ active: selectedMode === 'dark' }"
          @click="selectedMode = 'dark'"
        >
          <h3>🌙 내장 모드</h3>
          <p>차분하고 눈에 편한 테마</p>
        </div>
      </div>
      <button class="save-button" @click="saveMode">저장하기</button>
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
  min-height: 65vh;
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
  gap: var(--space-l);
  margin-top: var(--space-m);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
  justify-content: center;
}

.mode-card {
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

.mode-card h3 {
  font-size: 22px;
  margin-bottom: var(--space-s);
}

.mode-card p {
  font-size: 16px;
  color: var(--dark-gray);
}

.mode-card:hover {
  transform: translateY(-3px);
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
}

.mode-card.active {
  border-color: var(--danger);
  background-color: var(--light-yellow);
}

.save-button {
  background-color: var(--danger);
  color: white;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: var(--radius);
  padding: var(--space-m) var(--space-l);
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: 'Pretendard', sans-serif;
}

.save-button:hover {
  background-color: var(--light-yellow);
  color: var(--black);
}
</style>
