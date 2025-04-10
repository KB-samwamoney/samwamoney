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
          <SearchBar @search="handleSearch" @reset="handleReset" />
        </section>

        <!-- 수입/지출 요약 박스 -->
        <section class="summary">
          <SummaryBox v-if="summaryItems.length" :month="currentMonth" :items="summaryItems" />
        </section>

        <section class="resultBox">
          <!-- 1. 검색 전 → CalendarView -->
          <CalendarView v-if="searchResults === null" />

          <!-- 2. 검색 결과 → SearchResult 보여주기 -->
          <SearchResult v-else :results="searchResults" />
        </section>
      </main>
    </section>
  </div>
</template>

<script setup>
import SearchBar from '@/components/main/search/SearchBar.vue'
import CalendarView from '@/components/main/calendar/CalendarView.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import SummaryBox from '@/components/main/summary/SummaryBox.vue'
import SearchResult from '@/components/main/search/SearchResult.vue'
import axios from 'axios'

import { ref } from 'vue'

const currentMonth = ref(4) // 예시로 4월
const summaryItems = ref([
  { date: '2025-04-01', type: '수입', amount: 3000000 },
  { date: '2025-04-05', type: '지출', amount: 2500000 },
])

// search 관련 반응형 변수 선언
const searchResults = ref(null)

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

  // 기본 필터링
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
  min-height: 0; /* 콘텐츠가 늘어져도 부모 영역 초과 못 하게 */
  overflow: hidden; /* 필요시 스크롤 조절 */
}

.sidebar {
  width: 300px;
  background-color: #fff6da;
  flex-shrink: 0; /* 절대 줄어들지 않도록 설정 */
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* 내부 콘텐츠가 넘칠 때 스크롤 가능하게 */
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

.resultBox {
  padding: 1rem;
  flex-shrink: 0;
  flex: 1; /* 남은 공간 꽉 채우게 */
}
</style>
