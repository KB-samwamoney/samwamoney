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

// 데이터가 비어있는지 확인할 변수
// 초기값 false
const empty = ref(false)
const summaryStore = useSummaryStore()
const { currentCategory, currentTab, balanceList, currentDate } = storeToRefs(summaryStore)

// 날짜 정보 가져오기 YYYY-MM 형태로 반환
const currentYearMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
})

// 현재 탭(수입/지출)에 맞는 카테고리 배열 반환
const filteredCategories = computed(() =>
  currentCategory.value.filter((cat) =>
    currentTab.value === '수입' ? cat.type === 'income' : cat.type === 'expense',
  ),
)

// 현재 선택된 연도-월과 탭(수입/지출)에 따라,
// 각 카테고리별로 해당 월에 얼마를 썼는지(또는 벌었는지)
// 총합을 계산해서 배열로 반환
const categoryAmounts = computed(() => {
  return filteredCategories.value.map((cat) => {
    const total = balanceList.value
      .filter(
        // 카테고리명이 현재 cat.name과 같은 것
        // 날짜가 현재 연도-월인 것만 필터링
        (item) => item.category === cat.name && item.date.slice(0, 7) === currentYearMonth.value, // 연도+월 필터
      )
      // 필터링된 항목들의 amount(금액)을 모두 더해서 총합을 계산
      .reduce((sum, item) => sum + item.amount, 0)
    // 이 total 값을 배열에 하나씩 담아서 최종적으로 반환
    return total
  })
})

// 차트 데이터 구성
const chartData = computed(() => ({
  // 현재 탭에 맞는 카테고리 배열에서 name만 뽑아서 새 배열로 만들어줌
  labels: filteredCategories.value.map((cat) => cat.name),
  datasets: [
    {
      // 현재 탭에 맞는 카테고리 배열에서 color만 뽑아서 새 배열로 만들어줌
      backgroundColor: filteredCategories.value.map((cat) => cat.color),
      // 총 합을 계산한 배열을 data로 사용
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
  // categoryAmounts 값이 모두 0일 경우
  // 데이터가 없음 문구 띄워주기 위한 로직
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
