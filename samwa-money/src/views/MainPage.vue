<template>
  <div class="main-page">
    <section class="main-body">
      <aside class="sidebar">
        <SideBar />
      </aside>

      <main class="content-area">
        <section class="searchBox">
          <SearchBar @search="handleSearch" @reset="handleReset" />
        </section>

        <section class="summary">
          <SummaryBox />
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
import { ref, onMounted, watch } from 'vue'
import SearchBar from '@/components/main/search/SearchBar.vue'
import CalendarView from '@/components/main/calendar/CalendarView.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import SummaryBox from '@/components/main/summary/SummaryBox.vue'
import SearchResult from '@/components/main/search/SearchResult.vue'
import { usePaymentStore } from '@/stores/paymentAddStore'
import api from '@/utils/axios.js'

const paymentStore = usePaymentStore()
const selectedDate = ref(new Date())
const searchResults = ref(null)

const updateViewDate = (date) => {
  paymentStore.setViewDate(date)
}

watch(selectedDate, (val) => {
  console.log('🟦 [MainPage] selectedDate 변경됨')
  paymentStore.viewDate = val
})

onMounted(async () => {
  paymentStore.viewDate = selectedDate.value
  await paymentStore.fetchPayments()
  console.log('✅ [MainPage] 결제 내역 로드 완료')
})

watch(
  () => paymentStore.viewDate,
  (val) => {
    console.log('📌 viewDate 변경됨:', val)
  },
  { immediate: true },
)

const handleReset = () => {
  searchResults.value = null
}

const handleSearch = async ({ type, keyword, categories }) => {
  const res = await api.get('/Balance')
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
  padding: var(--space-s) var(--space-l);
}

.calendar {
  display: flex;
  flex: 1;
}

.resultBox {
  padding: 1rem;
  flex-shrink: 0;
  flex: 1;
  padding: var(--space-l);
}
</style>
