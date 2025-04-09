<template>
  <div class="line-graph-body">
    <LineGraph :type="type" />
    <LineGraphList :type="type" />
  </div>
</template>

<script setup>
import LineGraph from './LineGraph.vue'
import LineGraphList from './LineGraphList.vue'
import { watch } from 'vue'
const { type } = defineProps({
  type: String, // '수입' 또는 '지출'
})
watch(
  () => type,
  (newVal) => {},
)
</script>
<style scoped>
.line-graph-body {
  display: flex;
  gap: 2rem; /* 차트 사이 여백 */
  flex-direction: column;
}
</style>
