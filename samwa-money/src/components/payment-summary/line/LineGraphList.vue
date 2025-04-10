<template>
  <div class="line-chart-list">
    <div class="table-wrapper">
      <div v-if="empty" class="empty">데이터가 존재하지 않습니다.</div>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useSummaryStore } from '@/stores/summaryStore'
import { storeToRefs } from 'pinia'

const empty = ref(false)
const summaryStore = useSummaryStore()
const { balanceList, currentCategory, currentTab, currentDate } = storeToRefs(summaryStore)

const currentMonth = computed(() => String(currentDate.value.getMonth() + 1).padStart(2, '0'))

// 카테고리 이름(name)을 키, 타입(type) 을 value 값으로 저장하는 객체 생성
const categoryTypeMap = computed(() => {
  const map = {}
  currentCategory.value.forEach((cat) => {
    map[cat.name] = cat.type
  })
  return map
})

// 리스트를 만들어주고 정렬해줌
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

// 최초 로딩 시 데이터 가져오기
onMounted(async () => {
  await summaryStore.filterBalance()
  await summaryStore.filterCategory()
  let sum = 0
  for (const el of filteredList.value) {
    sum += el
  }
  if (sum === 0) {
    empty.value = true
  } else {
    empty.value = false
  }
})

// 수입/지출 탭 or 날짜 변경 시 다시 필터링
watch([currentTab, currentDate], async () => {
  await summaryStore.filterBalance()
  await summaryStore.filterCategory()
  let sum = 0
  for (const el of filteredList.value) {
    sum += el
  }
  if (sum === 0) {
    empty.value = true
  } else {
    empty.value = false
  }
})

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
  position: relative;
  margin-top: var(--space-l);
  padding: 0.5rem;
  background: var(--white);
  border-radius: 12px;
  border: 1px solid #f0e6cc;
  max-height: 610px;
}
.empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.1rem;
}
.table-wrapper {
  max-height: 600px;
  min-height: 300px;
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
th {
  top: 0;
  position: sticky;
  background-color: var(--white);
}
th,
td {
  padding: 0.5rem;
  text-align: center;
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
