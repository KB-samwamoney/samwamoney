<template>
  <div class="pie-chart">
    <Pie v-if="!empty" :data="chartData" :options="options" />
    <div v-if="empty" class="empty">데이터가 존재하지 않습니다.</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

import { useSummaryStore } from '@/stores/summaryStore'
import { storeToRefs } from 'pinia'
// Chart.js 등록
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

const empty = ref(false)
const summaryStore = useSummaryStore()
const { currentCategory, currentTab, balanceList, currentDate } = storeToRefs(summaryStore)

// 현재 연도-월 (예: 2025-04)
const currentYearMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
})

// 현재 탭에 맞는 카테고리 (수입/지출)
const filteredCategories = computed(() =>
  currentCategory.value.filter((cat) =>
    currentTab.value === '수입' ? cat.type === 'income' : cat.type === 'expense',
  ),
)

// 카테고리별 총합 계산 (현재 연도 & 월 기준)
const categoryAmounts = computed(() => {
  return filteredCategories.value.map((cat) => {
    const total = balanceList.value
      .filter(
        (item) => item.category === cat.name && item.date.slice(0, 7) === currentYearMonth.value, // 연도+월 필터
      )
      .reduce((sum, item) => sum + item.amount, 0)

    return total
  })
})

// 차트 데이터 구성
const chartData = computed(() => ({
  labels: filteredCategories.value.map((cat) => cat.name),
  datasets: [
    {
      backgroundColor: filteredCategories.value.map((cat) => cat.color),
      data: categoryAmounts.value,
    },
  ],
}))

// 차트 옵션
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

// 최초 로딩 시 데이터 가져오기
onMounted(async () => {
  await summaryStore.filterBalance()
  await summaryStore.filterCategory()
  let sum = 0
  for (const el of categoryAmounts.value) {
    sum += el
  }
  if (sum === 0) {
    empty.value = true
  } else {
    empty.value = false
  }
})

// 수입/지출 탭 or 날짜 변경 시 다시 필터링
watch([currentTab, currentDate], async () => {
  await summaryStore.filterBalance()
  await summaryStore.filterCategory()
  let sum = 0
  for (const el of categoryAmounts.value) {
    sum += el
  }
  if (sum === 0) {
    empty.value = true
  } else {
    empty.value = false
  }
})
</script>

<style scoped>
.pie-chart {
  position: relative;
  height: 350px;
  background-color: var(--white);
  border: 1px solid var(--light-yellow);
  padding: var(--space-m);
  margin: var(--space-m) var(--space-l);
  border-radius: 12px;
}
.empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.1rem;
}
</style>
