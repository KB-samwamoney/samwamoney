<template>
  <div class="line-chart">
    <Line v-if="!empty" :data="chartData" :options="options" />
    <div v-if="empty" class="empty">데이터가 존재하지 않습니다.</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
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
import { useSummaryStore } from '@/stores/summaryStore'
import { storeToRefs } from 'pinia'
// Chart.js 등록
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// 데이터가 비어있는지 확인할 변수
// 초기값 false
const empty = ref(false)
const summaryStore = useSummaryStore()
const { currentDate, currentTab, balanceList, currentCategory } = storeToRefs(summaryStore)

// 현재 선택된 날짜에서 해당 월의
// "마지막 날(며칠까지 있는지)"을 구하는 computed 함수
const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth() + 1
  return new Date(year, month, 0).getDate()
})

// 현재 선택된 월의 일자별 수입/지출 합계를 배열로 만들어주는 기능
// 예시) 1일 총 X원, 2일 총 Y원, ...
const dailyTotals = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const isIncome = currentTab.value === '수입'

  const categoryTypeMap = {}
  currentCategory.value.forEach((cat) => {
    categoryTypeMap[cat.name] = cat.type
  })

  const result = []
  for (let i = 1; i <= daysInMonth.value; i++) {
    const day = String(i).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    const filtered = balanceList.value.filter((item) => {
      const type = categoryTypeMap[item.category]
      return item.date === dateStr && type === (isIncome ? 'income' : 'expense')
    })

    const sum = filtered.reduce((acc, item) => acc + item.amount, 0)
    result.push(sum)
  }

  return result
})

// 차트 데이터 구성성
const chartData = computed(() => {
  const isIncome = currentTab.value === '수입'
  const lineColor = isIncome ? '#3b82f6' : '#ef4444'

  return {
    // 차트 아래쪽에 현재 달의 일수 만큼 라벨 생성성
    labels: Array.from({ length: daysInMonth.value }, (_, i) => i + 1),
    datasets: [
      {
        label: isIncome ? '수입 내역' : '지출 내역',
        data: dailyTotals.value,
        fill: false,
        borderColor: lineColor,
        backgroundColor: lineColor,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: lineColor,
        pointBorderColor: lineColor,
        borderWidth: 2,
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
      display: true,
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
        stepSize: 50000,
      },
      grid: {
        color: '#eee',
      },
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
  for (const el of dailyTotals.value) {
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
  for (const el of dailyTotals.value) {
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
.line-chart {
  position: relative;
  width: 100%;
  height: 350px;
  background-color: var(--white);
  border: 1px solid var(--light-yellow);
  padding: var(--space-m);
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
