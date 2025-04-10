<template>
  <div class="summary-toggle">
    <div class="tab">
      <button @click="currentTab = '수입'" :class="{ incomeActive: currentTab === '수입' }">
        수입
      </button>
      <span class="bar">|</span>
      <button @click="currentTab = '지출'" :class="{ expenseActive: currentTab === '지출' }">
        지출
      </button>
    </div>

    <div class="date-picker">
      <button @click="prevMonth" class="preBtn">◀</button>
      <span class="date">{{ formattedDate }}</span>
      <button @click="nextMonth" class="nextBtn">▶</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSummaryStore } from '@/stores/summaryStore'
import { computed, onMounted } from 'vue'

const summaryStore = useSummaryStore()
const { currentTab, currentDate } = storeToRefs(summaryStore)

// 페이지 로딩시 값 세팅
onMounted(() => {
  currentTab.value = '수입'
  currentDate.value = new Date()
})
// 날짜 정보 가져오기 YYYY.MM 형태로 반환
const formattedDate = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  return `${year}.${month}`
})

// 이전 달 확인하는 메서드
const prevMonth = () => {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() - 1)
  currentDate.value = date
}

// 다음 달 확인하는 메서드
const nextMonth = () => {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() + 1)
  currentDate.value = date
}
</script>
<style scoped>
.summary-toggle {
  height: var(--space-xl);
  display: flex;
  padding: var(--space-l);
  justify-content: space-between;
  align-items: center;
  margin: var(--space-s);
  background-color: var(--light-white);
  max-width: 1100px;
}
.bar {
  font-size: var(--space-l);
}
.tab button {
  background: none;
  color: var(--dark-gray);
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  box-shadow: none;
  font-weight: bold;
  font: inherit;
  font-size: var(--space-l);
  cursor: pointer;
}
.incomeActive {
  color: var(--blue) !important; /* 파란색 */
}
.expenseActive {
  color: var(--danger) !important; /* 빨간색 */
}

.date-picker {
  background-color: var(--lighter-yellow);
}
.date {
  border: none;
  color: var(--black);
  padding: 0;
  margin: 0;
  outline: none;
  box-shadow: none;
  font: inherit;
  font-size: var(--space-l);
}
.preBtn,
.nextBtn {
  background: none;
  color: var(--black);
  border: none;
  padding: 0;
  margin: 0;
  outline: none;
  box-shadow: none;
  font: inherit;
  font-size: var(--space-l);
  cursor: pointer;
}
</style>
