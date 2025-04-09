<template>
  <div class="line-chart">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const chartData = {
  labels: Array.from({ length: 30 }, (_, i) => i + 1),
  datasets: [
    {
      label: '지출 내역',
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 270, 0, 0, 20, 0, 0, 30, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      fill: false,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 5,
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
    },
    line: {
      tension: 0.3,
      borderColor: '#3b82f6',
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: '#eee',
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 50,
      },
      grid: {
        color: '#eee',
      },
    },
  },
}
</script>

<style scoped>
.line-chart {
  width: 100%;
  height: 300px;
}
</style>
