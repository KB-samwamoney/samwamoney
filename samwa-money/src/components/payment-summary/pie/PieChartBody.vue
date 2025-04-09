<template>
  <div class="pie-chart-body">
    <PieChart :type="type" />
    <PieChartList :type="type" />
  </div>
</template>

<script setup>
import PieChart from './PieChart.vue'
import PieChartList from './PieChartList.vue'
import { watch } from 'vue'
const { type } = defineProps({
  type: String, // '수입' 또는 '지출'
})
watch(
  () => type,
  (newVal) => {
    console.log('✅ type이 바뀌었어요:', newVal)
  },
)
</script>
<style scoped>
.pie-chart-body {
  display: flex;
  gap: 2rem; /* 차트 사이 여백 */
  flex-direction: column;
}
</style>
