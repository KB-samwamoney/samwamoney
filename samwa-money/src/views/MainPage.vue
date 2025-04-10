<template>
  <div class="main-page">
    <!-- 헤더 (로고 + 검색 + 카테고리 필터) -->
    <section class="main-header">
      <HeaderSearch />
    </section>

    <section class="main-body">
      <!-- 좌측 메뉴바 -->
      <aside class="sidebar">
        <SideBar />
      </aside>

      <!-- 우측 내용 -->
      <main class="content-area">
        <!-- searchBox -->
        <section class="searchBox">
          <SearchBar />
        </section>
        <!-- 수입/지출 요약 박스 -->
        <section class="summary">
          <SummaryBox
            :month="currentMonth"
            :items="summaryItems"
          />
        </section>

        <!-- 캘린더, 월별 리스트, 검색박스 -->
        <section class="calendar">
          <CalendarView v-model:selectedDate="selectedDate" />
        </section>
      </main>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import SearchBar from '@/components/main/search/SearchBar.vue'
import CalendarView from '@/components/main/calendar/CalendarView.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import SummaryBox from '@/components/main/summary/SummaryBox.vue'
import { usePaymentStore } from '@/stores/paymentAddStore'

const paymentStore = usePaymentStore()

// 사용자 선택 기준 날짜
const selectedDate = ref(new Date())

// 선택한 날짜의 월
const currentMonth = computed(() => selectedDate.value.getMonth() + 1)

watch(selectedDate, (newVal) => {
  console.log('📌 선택된 날짜 변경됨:', newVal)
})

// 수입/지출 필터링
const summaryItems = computed(() => {
  return paymentStore.paymentList
    .filter(item => {
      const itemDate = new Date(item.date)
      return (
        itemDate.getFullYear() === selectedDate.value.getFullYear() &&
        itemDate.getMonth() + 1 === currentMonth.value
      )
    })
    .map(item => ({
      type: isIncome(item.category) ? '수입' : '지출',
      amount: item.amount,
      date: item.date
    }))
})

// 수입 카테고리 판별
const isIncome = (category) => {
  const incomeCategories = ['월급', '용돈', '기타', '상여', '금융소득', '부수입', '환급금', '투자수익', '중고거래', '캐시백/포인트']
  return incomeCategories.includes(category)
}

// 최초 실행 시 결제 내역 로딩
onMounted(async () => {
  await paymentStore.fetchPayments()
})

// 나중에 CalendarView → MainPage 로 selectedDate 바꾸고 싶으면 이걸로 emit 가능
</script>

<style scoped>
.main-page {
  background-color: #fef9ee;
  display: flex;
  flex-direction: column;
}

.main-header {
  border-bottom: 1px solid #eee;
}

.main-body {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 300px;
  background-color: #fff6da;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.searchBox {
  display: flex;
  height: 150px;
}

.summary {
  display: flex;
  height: 130px;
}

.calendar {
  display: flex;
  flex: 1; /* 남은 공간 꽉 채우기 */
}
</style>
