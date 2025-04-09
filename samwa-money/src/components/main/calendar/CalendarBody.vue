<template>
  <div class="calendar-container">
    <v-calendar
      class="calendar"
      mode="month"
      v-model="selectedDate"
      show-six-weeks
      is-expanded
      style="height: 100%; width: 100%;"
    >
      <template #day-content="{ day }">
        <div
          class="day-cell"
          :class="{ selected: isSelected(day.date) }"
          @click="selectDate(day.date)"
        >
          <div class="day-number">{{ day.day }}</div>
          <div v-if="hasTransaction(day.date)" class="transactions">
            <div
              v-for="(item, index) in transactionMap[formatDate(day.date)]"
              :key="index"
              :class="item.type"
            >
              {{ item.type === 'income' ? '+' : '-' }}{{ item.amount.toLocaleString() }}
            </div>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 선택된 날짜
const selectedDate = ref(new Date())

// 날짜 클릭 시 호출
const selectDate = (date) => {
  selectedDate.value = date
}

// 날짜가 선택된 상태인지 확인
const isSelected = (date) => {
  return formatDate(date) === formatDate(selectedDate.value)
}

// 샘플 거래 데이터
const transactionMap = {
  '2025-04-15': [
    { type: 'income', amount: 50000 },
    { type: 'expense', amount: 20000 },
  ],
  '2025-04-18': [
    { type: 'expense', amount: 120000 },
  ]
}

const formatDate = (date) => date.toISOString().split('T')[0]
const hasTransaction = (date) => formatDate(date) in transactionMap
</script>

<style>
.calendar-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.calendar {
  width: 100%;
  height: 100%;
}

.vc-container {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  padding: 20px; /* 안쪽 여백 */
  box-sizing: border-box; /* 패딩 포함되게 */
}

.vc-weeks {
  flex: 1 !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}

.vc-week {
  flex: 1 !important;
  display: flex;
}

.vc-day {
  flex: 1 !important;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  padding: 4px;
  box-sizing: border-box;
}

/* 날짜 셀 스타일 */
.day-cell {
  flex: 1;
  height: 100%;
  padding: 4px;
  border-radius: 6px;
  box-sizing: border-box;
  transition: background 0.2s;
  cursor: pointer;
}

.day-cell:hover {
  background-color: var(--light-white);
}

.day-cell.selected {
  background-color: var(--baby-pink);
  border: 2px solid var(--light-yellow);
}

.vc-header {
  margin-bottom: 50px !important; /* ✅ 날짜 영역과의 간격 확보 */
  font-weight: bold;
  font-size: 18px;
  color: #333;
  justify-content: space-between;
  align-items: center;
}

.vc-title {
  font-size: 20px;
  font-weight: 600;
}


/* 날짜 숫자 및 거래내역 */
.day-number {
  font-weight: bold;
  margin-bottom: 4px;
}

.transactions {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.income {
  color:  var(--blue);
}

.expense {
  color: var(--danger);
}
</style>

