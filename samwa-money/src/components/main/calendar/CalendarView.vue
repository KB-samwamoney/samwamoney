<template>
  <div class="calendar-view">
    <!-- 헤더 탭 -->
    <CalendarHeader
      :currentMode="mode"
      @updateMode="mode = $event"
    />

    <!-- 모드에 따라 컴포넌트 분기 -->
    <div v-if="mode === 'calendar'">
      <v-calendar
        mode="single"
        v-model="selectedDate"
        is-expanded
      />
    </div>

    <div v-else>
      <!-- 월별 요약 콘텐츠 -->
       <!-- MonthlyList 불러올 예정 -->
      <p>월별 요약이 여기에 표시됩니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarHeader from './CalendarHeader.vue'

const mode = ref('calendar') // 'calendar' 또는 'monthly'
const selectedDate = ref(new Date())
</script>

<style scoped>
.calendar-view {
  background: white;
  border-radius: 12px;
  padding: 20px;
}
</style>
