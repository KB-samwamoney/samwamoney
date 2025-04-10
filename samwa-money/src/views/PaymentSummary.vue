<script setup>
import { ref } from 'vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import SummaryBody from '@/components/payment-summary/SummaryBody.vue'
import SummaryHeader from '@/components/payment-summary/SummaryHeader.vue'
import SearchResult from '@/components/main/search/SearchResult.vue'
import SearchBar from '@/components/main/search/SearchBar.vue' // ✅ 추가

const searchResults = ref([])

function handleSearch(payload) {
  // 예시: 서버에서 Balance 정보 받아서 필터링
  fetch('http://localhost:5500/Balance')
    .then((res) => res.json())
    .then((data) => {
      let filtered = data

      // 필터 조건 적용
      if (payload.type === 'search_title') {
        filtered = data.filter((item) => item.title.includes(payload.keyword))
      } else if (payload.type === 'search_memo') {
        filtered = data.filter((item) => item.memo.includes(payload.keyword))
      } else if (payload.type === 'search_cash') {
        filtered = data.filter((item) => item.amount === Number(payload.keyword))
      } else if (payload.type === 'search_category') {
        filtered = data.filter((item) => payload.keyword.includes(item.category))
      }

      searchResults.value = filtered
    })
}
</script>

<template>
  <div class="main-body">
    <aside class="sidebar">
      <SideBar />
    </aside>

    <div class="wrap">
      <SummaryHeader />
      <SearchBar @search="handleSearch" />
      <!-- ✅ 검색창 넣기 -->
      <SummaryBody v-if="!searchResults.length" />
      <SearchResult v-else :results="searchResults" />
    </div>
  </div>
</template>

<style scoped>
.main-body {
  display: flex;
  background-color: #fff5f5;
}
.sidebar {
  width: 300px;
  background-color: #fff6da;
}
</style>
