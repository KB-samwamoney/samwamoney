<template>
  <div class="main-page">
    <!-- 헤더 (로고 + 검색 + 카테고리 필터) -->
    <section class="main-header">
      <HeaderSearch />
    </section>

    <section class="main-body">
      <!-- 좌측 메뉴바 -->
      <aside class="sidebar">
        <SidebarMenu />
      </aside>

      <!-- 우측 내용 -->
      <main class="content-area">
        <!-- searchBox -->
        <section class="searchBox">
          <SearchBar />
        </section>

        <!-- 수입/지출 요약 박스 -->
        <section class="summary">
          <SummaryBox />
        </section>

        <!-- 캘린더, 월별 리스트, 검색박스 -->
        <section class="calendar">
          <CalendarView />
        </section>
      </main>
    </section>

    <AddButton />
  </div>
</template>

<script setup>
import SearchBar from '@/components/main/search/SearchBar.vue'
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
  height: 150px;
  background-color: rgb(180, 154, 116);
}

.calendar {
  display: flex;
  height: 600px;
  background-color: blanchedalmond;
}
</style>
