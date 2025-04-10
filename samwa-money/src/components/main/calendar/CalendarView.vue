<template>
  <div class="calendar-view">
    <CalendarHeader :currentMode="mode" @updateMode="mode = $event" />

    <div v-if="mode === 'calendar'" class="calendar-content">
      <CalendarBody
        :selectedDate="props.selectedDate"
        @update:selectedDate="(val) => emit('update:selectedDate', val)"
        @update:viewDate="(val) => emit('update:viewDate', val)"
      />
    </div>

    <MonthlyBody v-if="mode === 'monthly'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarBody from './CalendarBody.vue'
import MonthlyBody from './MonthlyBody.vue'

const props = defineProps({
  selectedDate: {
    type: Date,
    required: true,
  },
})

const mode = ref('calendar')

const emit = defineEmits(['update:selectedDate', 'update:viewDate'])

// const handleViewDateChange = (date) => {
//   emit('update:viewDate', date) // 📤 부모로 전달
// }
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
