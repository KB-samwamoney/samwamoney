<template>
  <div class="calendar-container">
    <!-- 달력 컴포넌트 설정 -->
    <v-calendar
      class="calendar"
      mode="month"
      :model-value="props.selectedDate"
      show-six-weeks
      is-expanded
      style="height: 100%; width: 100%;"
      @update:view-date="handleViewDateChange"
    >
      <!-- 날짜 셀 커스터마이징 -->
      <template #day-content="{ day }">
        <div
          class="day-cell"
          :class="{ selected: isSelected(day.date) }"
          @click="selectDate(day.date)"
        >
          <!-- 날짜 숫자 출력 -->
          <div class="day-number">{{ day.day }}</div>

          <!-- 거래 내역이 있을 경우만 표시 -->
          <div v-if="hasTransaction(day.date)" class="transactions">
            <div
              v-for="(item, index) in getTransactionsByDate(day.date)"
              :key="index"
              :class="item.type"
            >
              <!-- 수입은 +, 지출은 - 표시 -->
              {{ item.type === 'income' ? '+' : '-' }}{{ item.amount.toLocaleString() }}
            </div>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePaymentStore } from '@/stores/paymentAddStore'

// 부모로부터 선택된 날짜를 props로 받음
const props = defineProps({
  selectedDate: Date
})

// 부모에게 선택된 날짜를 업데이트로 전달
const emit = defineEmits(['update:selectedDate'])

// 선택된 날짜
// const selectedDate = ref(new Date())

// Pinia 스토어에서 결제 데이터 사용
const paymentStore = usePaymentStore()

// 최초 마운트 시 결제 내역 불러오기
onMounted(async () => {
  await paymentStore.fetchPayments()
  console.log('불러온 결제 데이터:', paymentStore.paymentList)
})

// 날짜 클릭 시 선택된 날짜 변경
const selectDate = (date) => {
  // selectedDate.value = date
  emit('update:selectedDate', date)
}

// 날짜가 현재 선택된 날짜인지 확인
const isSelected = (date) => {
  return formatDate(date) === formatDate(props.selectedDate)
}

// 날짜를 'YYYY-MM-DD' 형식으로 변환
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toISOString().split('T')[0]
}

// 해당 날짜에 거래가 있는지 여부 확인
const hasTransaction = (date) => {
  const key = formatDate(date)
  return Array.isArray(transactionMap.value[key]) && transactionMap.value[key].length > 0
}

const handleViewDateChange = (newViewDate) => {
  // 현재 보고 있는 달이 바뀌었을 때 부모로 전달
  emit('update:selectedDate', new Date(newViewDate))
}

// 카테고리 이름으로 수입/지출 구분
const isIncome = (category) => {
  const incomeCategories = [
    '월급', '용돈', '기타', '상여', '금융소득',
    '부수입', '환급금', '투자수익', '중고거래', '캐시백/포인트'
  ]
  return incomeCategories.includes(category)
}

// paymentList 데이터를 날짜별로 정리한 객체로 변환 (ex. { '2025-04-09': [{...}, {...}] })
const transactionMap = computed(() => {
  const map = {}

  paymentStore.paymentList.forEach((item) => {
    const date = formatDate(item.date)
    const type = isIncome(item.category) ? 'income' : 'expense'

    if (!map[date]) map[date] = []

    map[date].push({
      type,
      amount: item.amount
    })
  })

  return map
})

// 특정 날짜의 거래 내역 배열 반환
const getTransactionsByDate = (date) => {
  const key = formatDate(date)
  return transactionMap.value[key] || []
}
</script>

<style>
/* 전체 달력 컨테이너 */
.calendar-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 달력 기본 사이즈 */
.calendar {
  width: 100%;
  height: 100%;
}

/* 달력 레이아웃 스타일 */
.vc-container {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

/* 주, 일 구조 */
.vc-weeks {
  flex: 1 !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.vc-week {
  flex: 1 !important;
  display: flex;
}

/* 각 날짜 셀 */
.vc-day {
  flex: 1 !important;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  padding: 4px;
  box-sizing: border-box;
}

/* 날짜 셀 안쪽 */
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

/* 선택된 날짜 강조 */
.day-cell.selected {
  background-color: var(--baby-pink);
  border: 2px solid var(--light-yellow);
}

/* 달력 상단 월/년 헤더 */
.vc-header {
  margin-bottom: 50px !important;
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

/* 날짜 숫자 */
.day-number {
  font-weight: bold;
  margin-bottom: 4px;
}

/* 거래 내역 텍스트 스타일 */
.transactions {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* 수입 스타일 */
.income {
  color: var(--blue);
}

/* 지출 스타일 */
.expense {
  color: var(--danger);
}
</style>
