<template>
  <div class="calendar-view">
    <CalendarHeader
      :currentMode="mode"
      @updateMode="mode = $event"
    />

    <div v-if="mode === 'calendar'" class="calendar-content">
      <CalendarBody />
    </div>

    <MonthlyBody
      v-if="mode === 'monthly'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarBody from './CalendarBody.vue'
import MonthlyBody from './MonthlyBody.vue'

const mode = ref('calendar')
</script>

<style scoped>
.calendar-view {
  width: 100%;
  height: 100%;
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
