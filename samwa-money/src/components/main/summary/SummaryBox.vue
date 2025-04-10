<template>
  <div class="summary-box" v-if="!paymentStore.loading && paymentStore.paymentList.length > 0">
    <h3 class="title">{{ currentMonth }}월 내역</h3>
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
        <p class="value total-amount">{{ totalBalance.toLocaleString() }}원</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePaymentStore } from '@/stores/paymentAddStore'

const paymentStore = usePaymentStore()
const { currentMonth, incomeTotal, expenseTotal, totalBalance } = storeToRefs(paymentStore)
</script>

<style scoped>
.summary-box {
  width: 100%;
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

.empty-message {
  font-size: 16px;
  color: var(--dark-gray);
  padding: 1rem 0;
  text-align: center;
}
</style>
