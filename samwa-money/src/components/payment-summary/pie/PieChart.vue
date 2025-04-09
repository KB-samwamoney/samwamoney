<template>
  <div class="pie-chart">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useSummaryStore } from '@/stores/summaryStore'
import { storeToRefs } from 'pinia'
const props = defineProps({
  type: String,
  date: String, // 혹은 Number 타입이면 Number
})

const summaryStore = useSummaryStore()
// 모든 카테고리를 스토어에서 일단 가져왔음
const { currentCategory } = storeToRefs(summaryStore)
const { currentTab } = storeToRefs(summaryStore)
const { currentDate } = storeToRefs(summaryStore)
// 필터링된 수입/지출값
const { balanceList } = storeToRefs(summaryStore)

onMounted(() => {
  summaryStore.filterCategory()
  console.log('-=-=-=-=-=-=-=-=-==--==--=-=-', balanceList.value)

  console.log('!!!!!!!!!!!props.type, props.date', props.type, props.date)
})

watch([currentTab, currentDate], () => {
  summaryStore.filterCategory() // 수입/지출 or 날짜 바뀔 때 실행
  console.log('-=-=-=-=-=-=-=-=-==--==--=-=-', balanceList.value)
  console.log(currentCategory.value.filter((item) => item.type === 'expense'))

  console.log('!!!!!!!!!!!props.type, props.date', props.type, props.date)
})

// 차트 컴포넌트 불러오기기
import { Pie } from 'vue-chartjs'
// chart.js에서 필요한 기능 등록
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
const data = computed(() => {
  const incomeCategories = currentCategory.value.filter((item) => item.type === 'income')
  const expenseCategories = currentCategory.value.filter((item) => item.type === 'expense')
  return currentTab.value === '수입'
    ? {
        labels: incomeCategories.map((item) => item.name),
        datasets: [
          {
            backgroundColor: incomeCategories.map((item) => item.color),
            data: currentCategory.value.filter((item) => item.type === 'income'),
          },
        ],
      }
    : {
        labels: expenseCategories.map((item) => item.name),
        datasets: [
          {
            backgroundColor: expenseCategories.map((item) => item.color),
            data: currentCategory.value.filter((item) => item.type === 'expense'),
          },
        ],
      }
})
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
</script>
<style scoped>
.pie-chart {
  border: 1px solid red;
}
</style>
