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
  background-color: var(--lighter-yellow);
  margin: var(--space-s);
  padding: var(--space-m);
  display: flex;
  flex-direction: column;
}
</style>
