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
          <SearchBar @search="handleSearch" />
        </section>

        <section class="resultBox">
          <SearchResult :results="searchResults" />
        </section>

        <!-- 수입/지출 요약 박스 -->
        <section class="summary">
          <SummaryBox v-if="summaryItems.length" :month="currentMonth" :items="summaryItems" />
        </section>

        <!-- 캘린더, 월별 리스트, 검색박스 -->
        <section class="calendar">
          <CalendarView />
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
const searchResults = ref([])

const handleSearch = async ({ type, keyword }) => {
  const res = await axios.get('http://localhost:5500/Balance')
  const data = res.data

  if (type === 'search_category') {
    searchResults.value = data.filter((item) => keyword.includes(item.category))
  } else if (type === 'search_title') {
    searchResults.value = data.filter((item) => item.title.includes(keyword))
  } else if (type === 'search_cash') {
    searchResults.value = data.filter((item) => item.amount === Number(keyword))
  } else if (type === 'search_memo') {
    searchResults.value = data.filter((item) => item.memo.includes(keyword))
  }
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

.resultBox {
  padding: 1rem;
  flex-shrink: 0;
}
</style>
