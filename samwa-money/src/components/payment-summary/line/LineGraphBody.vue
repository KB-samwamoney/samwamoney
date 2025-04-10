<template>
  <div class="line-graph-body">
    <LineGraph :type="type" />
    <LineGraphList :type="type" />
  </div>
</template>

<script setup>
import LineGraph from './LineGraph.vue'
import LineGraphList from './LineGraphList.vue'
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
.line-graph-body {
  display: flex;
  gap: 2rem; /* 차트 사이 여백 */
  flex-direction: column;
}
</style>
