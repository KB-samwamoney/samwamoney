<template>
  <div class="summary-toggle">
    <div class="tab">
      <button @click="currentTab = '수입'">수입</button>
      <button @click="currentTab = '지출'">지출</button>
    </div>

    <div class="date-picker">
      <button @click="prevMonth">◀</button>
      <span>{{ formattedDate }}</span>
      <button @click="nextMonth">▶</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSummaryStore } from '@/stores/summaryStore'
import { ref, computed } from 'vue'

const summaryStore = useSummaryStore()
const { currentTab } = storeToRefs(summaryStore)

const currentDate = ref(new Date()) // 오늘 날짜 기준
</script>
<style scoped></style>
