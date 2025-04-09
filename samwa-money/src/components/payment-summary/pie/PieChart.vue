<template>
  <div class="pie-chart">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSummaryStore } from '@/stores/summaryStore'
import { storeToRefs } from 'pinia'

const summaryStore = useSummaryStore()
// 모든 카테고리를 스토어에서 일단 가져왔음
const { currentCategory } = storeToRefs(summaryStore)
// 수입 or 지출 값을 가져왔음
const { currentTab } = storeToRefs(summaryStore)

onMounted(() => {
  summaryStore.filterCategory()
  console.log('currentTab', currentTab)
})

// 차트 컴포넌트 불러오기기
import { Pie } from 'vue-chartjs'
// chart.js에서 필요한 기능 등록
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
// 차트에 들어갈 데이터터
const data = {
  // 가져온 카테고리 배열을 넣어줌
  labels: ['Vue', 'React', 'Angular', '기타'],
  datasets: [
    {
      // 카테고리 테이블에서 카테고리에 맞는 색 가져와서 배열에 넣어줘야함
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#003300'],
      // 금액을
      data: [40000, 0, 25000, 26000],
    },
  ],
}
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
