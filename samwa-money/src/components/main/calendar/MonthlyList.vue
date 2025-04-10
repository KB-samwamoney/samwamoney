<template>
  <div>
    <div v-if="payments.length > 0" class="payment-list">
      <h3>{{ month }}월 수입/지출 내역</h3>

      <div class="summary">
        총 수입: <span class="income">{{ totalIncome.toLocaleString() }}원</span>
        /
        총 지출: <span class="expense">{{ totalExpense.toLocaleString() }}원</span>
      </div>

      <div class="payment-list-scroll">
        <div
          v-for="(item, index) in payments"
          :key="index"
          class="payment-item"
          :class="item.type === '수입' ? 'income' : 'expense'"
        >
          <div class="date">{{ item.date }}</div>
          <div class="type">{{ item.type }}</div>
          <div class="amount">
            {{ item.type === '수입' ? '+' : '-' }}{{ item.amount.toLocaleString() }}원
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-message">
      {{ month }}월에 등록된 내역이 없어요.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePaymentStore } from '@/stores/paymentAddStore'

const props = defineProps({
  month: Number
})

const paymentStore = usePaymentStore()

// 해당 월의 내역 가져오기
const payments = computed(() => paymentStore.getPaymentsByMonth(props.month))

// 총 수입 계산
const totalIncome = computed(() =>
  payments.value
    .filter(item => item.type === '수입')
    .reduce((sum, item) => sum + item.amount, 0)
)

// 총 지출 계산
const totalExpense = computed(() =>
  payments.value
    .filter(item => item.type === '지출')
    .reduce((sum, item) => sum + item.amount, 0)
)
</script>

<style scoped>
.payment-list {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.summary {
  font-weight: bold;
  margin-bottom: 0.75rem;
  font-size: 14px;
}

.income {
  color: #2ecc71;
}

.expense {
  color: #e74c3c;
}

.payment-list-scroll {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* 리스트 카드 스타일 */
.payment-item {
  background: #fff;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.date {
  flex: 1;
  font-weight: 500;
}

.type {
  width: 50px;
  text-align: center;
  font-weight: 600;
}

.amount {
  min-width: 100px;
  text-align: right;
  font-weight: bold;
}

.empty-message {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 0.5rem;
  color: #999;
  font-style: italic;
}
</style>
