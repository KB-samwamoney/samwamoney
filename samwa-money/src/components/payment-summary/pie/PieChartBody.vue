<template>
  <div class="pie-chart-body">
    <PieChart :type="props.type" :date="props.date" />
    <PieChartList :type="props.type" :date="props.date" />
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue'
import PieChartList from './PieChartList.vue'
import { useSummaryStore } from '@/stores/summaryStore'
import { watch } from 'vue'

const summaryStore = useSummaryStore()
const props = defineProps({
  type: String,
  date: String,
})
watch(
  () => props.type,
  (newVal) => {
    summaryStore.filterCategory()
    summaryStore.filterBalance()
  },
)
</script>
<style scoped>
.pie-chart-body {
  background-color: var(--lighter-yellow);
  margin: var(--space-s);
  display: flex;
  flex-direction: column;
}
</style>
