<template>
  <div class="line-chart-list">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>분류</th>
            <th>내용</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredList" :key="item.id">
            <td>{{ formatDate(item.date) }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td
              :class="[
                'amount',
                categoryTypeMap[item.category] === 'income' ? 'income' : 'expense',
              ]"
            >
              {{ categoryTypeMap[item.category] === 'income' ? '+' : '-'
              }}{{ formatPrice(item.amount) }} 원
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSummaryStore } from '@/stores/summaryStore'
import { storeToRefs } from 'pinia'

const summaryStore = useSummaryStore()
const { balanceList, currentCategory, currentTab, currentDate } = storeToRefs(summaryStore)

const currentMonth = computed(() => String(currentDate.value.getMonth() + 1).padStart(2, '0'))

const categoryTypeMap = computed(() => {
  const map = {}
  currentCategory.value.forEach((cat) => {
    map[cat.name] = cat.type
  })
  return map
})

const filteredList = computed(() =>
  balanceList.value
    .filter((item) => {
      const type = categoryTypeMap.value[item.category]
      const isRightType = currentTab.value === '수입' ? type === 'income' : type === 'expense'
      const month = item.date.slice(5, 7)
      return month === currentMonth.value && isRightType
    })
    .sort((a, b) => a.date.localeCompare(b.date)),
)

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${year.slice(2)}.${month}.${day}`
}

const formatPrice = (price) => {
  return price.toLocaleString()
}
</script>

<style scoped>
.line-chart-list {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #fff9e6;
  border-radius: 12px;
  border: 1px solid #f0e6cc;
}

.table-wrapper {
  max-height: 250px;
  overflow-y: auto;
}

/* 스크롤 커스터마이징 (선택) */
.table-wrapper::-webkit-scrollbar {
  width: 6px;
}
.table-wrapper::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 350px;
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.amount {
  text-align: right;
  color: #e63946;
  font-weight: 600;
}

.income {
  color: #3b82f6; /* 파란색 계열 */
}

.expense {
  color: #ef4444; /* 빨간색 계열 */
}
</style>
