<template>
  <div class="month-list">
    <div
      v-for="month in months"
      :key="month"
      class="month-block"
    >
      <button
        @click="selectMonth(month)"
        class="month-button"
      >
        {{ month }}월
      </button>

      <!-- 해당 달이 선택되었을 때만 리스트 보여주기 -->
      <MonthlyList
        v-if="selectedMonth === month"
        :month="month"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MonthlyList from './MonthlyList.vue'

const months = ref(Array.from({ length: 12 }, (_, i) => i + 1))
const selectedMonth = ref(null)

function selectMonth(month) {
  selectedMonth.value = selectedMonth.value === month ? null : month
}
</script>

<style scoped>
.month-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.month-block {
  display: flex;
  flex-direction: column;
}

.month-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s;
}

.month-button:hover {
  background-color: var(--light-white);
  border-color: var(--light-yellow);
}
</style>
