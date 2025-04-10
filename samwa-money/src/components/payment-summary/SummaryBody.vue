<template>
  <div class="summary-body">
    <PieChartBody class="PieChartBody" />
    <LineGraphBody class="LineGraphBody" />
  </div>
</template>

<script setup>
import LineGraphBody from './line/LineGraphBody.vue'
import PieChartBody from './pie/PieChartBody.vue'
</script>
<style scoped>
.summary-body {
  display: flex;
  padding: var(--space-l);
  padding-top: 0;
  gap: 2rem; /* 차트 사이 여백 */
  justify-content: space-between;
  align-items: flex-start; /* 필요시 조정 */
  background-color: var(--light-white);
  max-width: 1100px;
}
/* 각 영역의 고정 너비를 줄 수도 있음 */
.summary-body > * {
  flex: 1;
  min-width: 400px;
}
</style>
