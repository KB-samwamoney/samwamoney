<template>
  <div class="pie-chart-body">
    <PieChart />
    <PieChartList />
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue'
import PieChartList from './PieChartList.vue'
import { useSummaryStore } from '@/stores/summaryStore'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const summaryStore = useSummaryStore()
const { currentTab, currentDate } = storeToRefs(summaryStore)

// currentTab(수입, 지출), currentDate(날짜) 값이 변경될때마다
// balance배열과 currentTab으로 필터링된 카테고리 배열 다시 불러와줌
watch([currentTab, currentDate], async () => {
  await summaryStore.filterBalance()
  await summaryStore.filterCategory()
})
</script>
<style scoped>
.pie-chart-body {
  background-color: var(--lighter-yellow);
  margin: var(--space-s);
  display: flex;
  flex-direction: column;
}
</style>
