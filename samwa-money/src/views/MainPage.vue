<template>
  <div class="main-page">
    <section class="main-header">
      <HeaderSearch />
    </section>

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
import { ref } from 'vue'
import SearchBar from '@/components/main/search/SearchBar.vue'
import CalendarView from '@/components/main/calendar/CalendarView.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import SummaryBox from '@/components/main/summary/SummaryBox.vue'

const currentMonth = ref(4) // 예시로 4월
const summaryItems = ref([
  { date: '2025-04-01', type: '수입', amount: 3000000 },
  { date: '2025-04-05', type: '지출', amount: 2500000 },
])
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
