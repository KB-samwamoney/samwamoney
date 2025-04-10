<template>
  <div class="main-page">
    <section class="main-header"></section>

    <section class="main-body">
      <aside class="sidebar">
        <SideBar />
      </aside>

      <main class="content-area">
        <section class="searchBox">
          <SearchBar @search="handleSearch" @reset="handleReset" />
        </section>

        <section class="summary">
          <SummaryBox v-if="summaryItems.length" :month="currentMonth" :items="summaryItems" />
        </section>

        <section class="resultBox">
          <!-- 1. 검색 전 → CalendarView -->
          <CalendarView
            v-if="searchResults === null"
            v-model:selectedDate="selectedDate"
            @update:viewDate="updateViewDate"
          />

          <!-- 2. 검색 결과 → SearchResult 보여주기 -->
          <SearchResult v-else :results="searchResults" />
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

const updateViewDate = (date) => {
  console.log('📅 [MainPage] updateViewDate 실행됨:', date)
  viewDate.value = date
}

const currentMonth = computed(() => viewDate.value.getMonth() + 1)
const currentYear = computed(() => viewDate.value.getFullYear())

const isIncome = (category) => {
  const incomeCategories = [
    '월급',
    '용돈',
    '기타',
    '상여',
    '금융소득',
    '부수입',
    '환급금',
    '투자수익',
    '중고거래',
    '캐시백/포인트',
  ]
  return incomeCategories.includes(category)
}

const summaryItems = computed(() => {
  const month = currentMonth.value
  const year = currentYear.value
  const list = paymentStore.paymentList

  console.log(`💡 [SummaryItems] 연도: ${year}, 월: ${month}`)
  console.log('📦 현재 paymentList:', list)

  const items = list
    .filter((item) => {
      const itemDate = new Date(item.date)
      return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month
    })
    .map((item) => ({
      type: isIncome(item.category) ? '수입' : '지출',
      amount: item.amount,
      date: item.date,
    }))

  console.log(`📊 [SummaryItems] ${month}월 수입/지출 목록:`, items)
  return items
})

watch(viewDate, (val) => {
  console.log('📌 [MainPage] viewDate 변경됨:', val)
})

watch(selectedDate, (val) => {
  console.log('🟦 [MainPage] selectedDate 변경됨:', val)
  viewDate.value = val
})

onMounted(async () => {
  await paymentStore.fetchPayments()
  console.log('✅ [MainPage] 결제 내역 로드 완료:', paymentStore.paymentList)
})

const handleReset = () => {
  searchResults.value = null
}

const handleSearch = async ({ type, keyword, categories }) => {
  const res = await axios.get('http://localhost:5500/Balance')
  let data = res.data

  if (type === 'search_all') {
    searchResults.value = data.sort((a, b) => new Date(b.date) - new Date(a.date))
    return
  }

  let filtered = data.filter((item) => {
    const categoryMatched =
      !categories || categories.length === 0 || categories.includes(item.category)

    let keywordMatched = true
    if (type === 'search_title') {
      keywordMatched = item.title.includes(keyword)
    } else if (type === 'search_memo') {
      keywordMatched = item.memo.includes(keyword)
    } else if (type === 'search_cash') {
      keywordMatched = item.amount === Number(keyword)
    } else if (type === 'search_category') {
      keywordMatched = true
    }

    return categoryMatched && keywordMatched
  })

  searchResults.value = filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
}
</script>

<style scoped>
.main-page {
  background-color: var(--light-white);
  display: flex;
  flex-direction: column;
}

.main-header {
  border-bottom: 1px solid #eee;
}

.main-body {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.sidebar {
  width: 300px;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  flex: 1;
}

.resultBox {
  padding: 1rem;
  flex-shrink: 0;
  flex: 1;
}
</style>
