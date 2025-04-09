<template>
  <div class="summary-toggle">
    <div class="tab">
      <button @click="currentTab = '수입'">수입</button>
      <button @click="currentTab = '지출'">지출</button>
    </div>

    <div class="date-picker">
      <button @click="prevMonth">◀</button>
      <span>{{ formattedDate }}</span>
      <button @click="nextMonth">▶</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSummaryStore } from '@/stores/summaryStore'
import { computed } from 'vue'

const summaryStore = useSummaryStore()
const { currentTab } = storeToRefs(summaryStore)
const { currentDate } = storeToRefs(summaryStore)

// 날짜 정보 가져오기
const formattedDate = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  return `${year}.${month}`
})

// 이전 달 확인하는 메서드
const prevMonth = () => {
  const date = new Date(currentDate.value)
  console.log('date', date)
  date.setMonth(date.getMonth() - 1)
  currentDate.value = date
}

// 다음 달 확인하는 메서드
const nextMonth = () => {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() + 1)
  console.log('date', date)
  currentDate.value = date
}
</script>
<style scoped>
.summary-toggle {
  height: var(--space-l);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
