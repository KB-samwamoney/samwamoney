<template>
  <div class="calendar-header">
    <!-- 왼쪽 버튼 영역 -->
    <div class="left">
      <button :class="{ active: currentMode === 'calendar' }" @click="setMode('calendar')">
        달력
      </button>
      <button :class="{ active: currentMode === 'monthly' }" @click="setMode('monthly')">
        월별
      </button>
    </div>

    <!-- 오른쪽 멘트 영역 -->
    <div class="right">
      <div class="summary-ment">
        <PaymentAnalyze />
      </div>
    </div>
  </div>
</template>

<script setup>
import PaymentAnalyze from '@/components/main/ment/PaymentAnalyze.vue'
const { currentMode } = defineProps(['currentMode'])

const emit = defineEmits(['updateMode'])

const setMode = (mode) => {
  emit('updateMode', mode)
}

const summaryMent = () => {
  return '이번 달은 수입이 지출보다 많아요! 💰'
}
</script>

<style scoped>
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: var(--light-white);
  padding: 10px 20px;
  gap: 10px;
}

.left {
  display: flex;
  gap: 10px;
}

.right {
  flex: 1;
  text-align: right;
  min-width: 200px;
}

.summary-ment {
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-gray);
  margin: 0;
}

button {
  background: none;
  border: none;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

button.active {
  font-weight: bold;
  border-color: var(--light-yellow);
}

@media (max-width: 600px) {
  .calendar-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .right {
    text-align: left;
    margin-top: 0.5rem;
  }
}
</style>
