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

// 날짜 정보 가져오기 YYYY-MM 형태로 반환
const currentYearMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
})

// 현재 탭(수입/지출)에 맞는 카테고리 배열 반환
const filteredCategories = computed(() =>
  currentCategory.value.filter((cat) =>
    currentTab.value === '수입' ? cat.type === 'income' : cat.type === 'expense',
  ),
)

// 현재 선택된 연도-월과 탭(수입/지출)에 따라,
// 각 카테고리별로 해당 월에 얼마를 썼는지(또는 벌었는지)
// 총합을 계산해서 배열로 반환
const categoryAmounts = computed(() => {
  return filteredCategories.value.map((cat) => {
    const total = balanceList.value
      .filter(
        // 카테고리명이 현재 cat.name과 같은 것
        // 날짜가 현재 연도-월인 것만 필터링
        (item) => item.category === cat.name && item.date.slice(0, 7) === currentYearMonth.value, // 연도+월 필터
      )
      // 필터링된 항목들의 amount(금액)을 모두 더해서 총합을 계산
      .reduce((sum, item) => sum + item.amount, 0)
    // 이 total 값을 배열에 하나씩 담아서 최종적으로 반환
    return total
  })
})

// 카테고리별 사용금액 총합
const totalAmount = computed(() => categoryAmounts.value.reduce((sum, val) => sum + val, 0))

// 비율 계산
const getPercent = (amount) => {
  if (totalAmount.value === 0) return 0
  return Math.round((amount / totalAmount.value) * 100)
}

// 최초 로딩 시 데이터 가져오기
onMounted(async () => {
  await summaryStore.filterBalance()
  await summaryStore.filterCategory()
})

// 수입/지출 탭 or 날짜 변경 시 다시 필터링
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
  border: 1px solid var(--light-gray);
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
  color: var(--white);
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
  color: var(--black);
}
</style>
