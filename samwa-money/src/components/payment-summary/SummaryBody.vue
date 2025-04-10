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
  flex-wrap: wrap;
  padding: var(--space-l);
  padding-top: 0;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}
/* 각 영역의 고정 너비를 줄 수도 있음 */
.summary-body > * {
  flex: 1;
  min-width: 400px;
}
</style>
