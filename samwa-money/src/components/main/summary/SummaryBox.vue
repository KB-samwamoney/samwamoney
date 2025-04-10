<template>
  <div class="summary-box">
    <h3 class="title">{{ month }}월 내역</h3>
    <div class="summary-items">
      <div class="item">
        <p class="label income">수입</p>
        <p class="value">{{ incomeTotal.toLocaleString() }}</p>
      </div>
      <div class="item">
        <p class="label expense">지출</p>
        <p class="value">{{ expenseTotal.toLocaleString() }}</p>
      </div>
      <div class="item">
        <p class="label total">합계</p>
        <p class="value total-amount">{{ (incomeTotal - expenseTotal).toLocaleString() }}원</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  month: {
    type: Number,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

const incomeTotal = computed(() =>
  props.items
    .filter(item => item.type === '수입')
    .reduce((sum, item) => sum + item.amount, 0)
)

const expenseTotal = computed(() =>
  props.items
    .filter(item => item.type === '지출')
    .reduce((sum, item) => sum + item.amount, 0)
)

watch(() => props.items, (val) => {
  console.log('📦 [SummaryBox] props.items 변경됨:', val)
}, { deep: true, immediate: true })
</script>

<style scoped>
.summary-box {
  width: 100%; /* 부모 너비에 맞게 꽉 채우기 */
  height: 100%;
  background-color: #fff;
  border: 1px solid var(--dark-gray);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.summary-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.item {
  flex: 1;
}

.label {
  font-size: 14px;
  margin-bottom: 0.3rem;
}

.label.income {
  color: var(--blue);
}

.label.expense {
  color: var(--danger);
}

.label.total {
  color: var(--dark-gray);
}

.value {
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
}
</style>
