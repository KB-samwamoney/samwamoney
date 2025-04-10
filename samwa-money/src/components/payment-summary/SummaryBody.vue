<template>
  <div class="summary-body">
    <PieChartBody class="PieChartBody" :type="currentTab" :date="currentDate" />
    <LineGraphBody class="LineGraphBody" :type="currentTab" :date="currentDate" />
  </div>
</template>

<script setup>
import LineGraphBody from './line/LineGraphBody.vue'
import PieChartBody from './pie/PieChartBody.vue'
import { useSummaryStore } from '@/stores/summaryStore'
import { storeToRefs } from 'pinia'

const summaryStore = useSummaryStore()
const { currentTab } = storeToRefs(summaryStore)
const { currentDate } = storeToRefs(summaryStore)
</script>
<style scoped>
.summary-body {
  display: flex;
  padding: var(--space-l);
  padding-top: 0;
  gap: 2rem; /* 차트 사이 여백 */
  justify-content: space-between;
  align-items: flex-start; /* 필요시 조정 */
  max-width: 1100px;
}
/* 각 영역의 고정 너비를 줄 수도 있음 */
.summary-body > * {
  flex: 1;
  min-width: 400px;
}
</style>
