<template>
  <div class="pie-summary">
    <div class="total">
      <span>총 {{ currentTab }}:</span> <span>{{ totalAmount.toLocaleString() }} 원</span>
    </div>

    <div class="category-list">
      <div class="category-item" v-for="(cat, i) in filteredCategories" :key="cat.name">
        <span class="percent" :style="{ backgroundColor: cat.color }">
          {{ getPercent(categoryAmounts[i]) }}%
        </span>
        <span class="label">{{ cat.name }}</span>
        <span class="amount">
          {{ categoryAmounts[i] ? categoryAmounts[i].toLocaleString() : '0' }} 원
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useSummaryStore } from '@/stores/summaryStore'
import { storeToRefs } from 'pinia'

const summaryStore = useSummaryStore()
const { currentTab, currentCategory, balanceList, currentDate } = storeToRefs(summaryStore)

// 현재 연도-월 문자열 구하기 (2025-04)
const currentYearMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
})

// 현재 탭에 맞는 카테고리만 추출
const filteredCategories = computed(() =>
  currentCategory.value.filter((cat) =>
    currentTab.value === '수입' ? cat.type === 'income' : cat.type === 'expense',
  ),
)

// 카테고리별 합산
const categoryAmounts = computed(() => {
  return filteredCategories.value.map((cat) => {
    return balanceList.value
      .filter(
        (item) => item.category === cat.name && item.date.slice(0, 7) === currentYearMonth.value,
      )
      .reduce((sum, item) => sum + item.amount, 0)
  })
})

// 총합
const totalAmount = computed(() => categoryAmounts.value.reduce((sum, val) => sum + val, 0))

// 비율 계산
const getPercent = (amount) => {
  if (totalAmount.value === 0) return 0
  return Math.round((amount / totalAmount.value) * 100)
}

// 데이터 로드
onMounted(async () => {
  await summaryStore.filterBalance()
  await summaryStore.filterCategory()
})

watch([currentTab, currentDate], async () => {
  await summaryStore.filterBalance()
  await summaryStore.filterCategory()
})
</script>

<style scoped>
.pie-summary {
  background-color: var(--lighter-yellow);
  padding: 1rem;
  border-radius: 12px;
}

.total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  padding: 0.5rem;
  background-color: var(--white);
  border-radius: 8px;
  border: 1px solid #ddd;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 0.5rem 0.75rem;
}

.percent {
  padding: 0.2rem 0.5rem;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  min-width: 36px;
  text-align: center;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

.label {
  flex: 1;
  font-weight: 500;
}

.amount {
  font-weight: bold;
  color: #444;
}
</style>
