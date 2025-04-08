<template>
  <div class="calendar-view">
    <CalendarHeader
      :currentMode="mode"
      @updateMode="mode = $event"
    />

    <div v-if="mode === 'calendar'" class="calendar-content">
      <CalendarBody />
    </div>

    <div v-else class="calendar-content">
      <p>월별 요약이 여기에 표시됩니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarBody from './CalendarBody.vue'

const mode = ref('calendar')
</script>

<style scoped>
.calendar-view {
  background: rgb(255, 234, 234);
  width: 100%;
  height: 100%; /* 화면 전체 높이 설정 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.calendar-content {
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
