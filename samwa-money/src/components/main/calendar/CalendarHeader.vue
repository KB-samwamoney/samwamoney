<template>
  <div class="calendar-header">
    <button
      :class="{ active: currentMode === 'calendar' }"
      @click="setMode('calendar')"
    >
      달력
    </button>
    <button
      :class="{ active: currentMode === 'monthly' }"
      @click="setMode('monthly')"
    >
      월별
    </button>
  </div>
</template>

<script setup>
const { currentMode } = defineProps(['currentMode'])

const emit = defineEmits(['updateMode'])

const setMode = (mode) => {
  emit('updateMode', mode)
}
</script>

<style scoped>
.calendar-header {
  display: flex;
  gap: 10px;
  background-color: #fff9dc;
  padding: 10px 20px;
  border-radius: 12px 12px 0 0;
}

button {
  background: none;
  border: none;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}

button.active {
  font-weight: bold;
  border-color: #ffd54f;
}
</style>
