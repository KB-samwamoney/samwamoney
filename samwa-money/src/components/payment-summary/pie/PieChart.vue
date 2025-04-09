<template>
  <div class="pie-chart">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script setup>
// 차트 컴포넌트 불러오기기
import { Pie } from 'vue-chartjs'
// chart.js에서 필요한 기능 등록
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
// 차트에 들어갈 데이터터
const data = {
  labels: ['Vue', 'React', 'Angular'],
  datasets: [
    {
      label: '프레임워크 점유율',
      backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
      data: [40, 30, 30],
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
