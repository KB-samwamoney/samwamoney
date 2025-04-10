<script setup>
import { ref } from 'vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import SummaryBody from '@/components/payment-summary/SummaryBody.vue'
import SummaryHeader from '@/components/payment-summary/SummaryHeader.vue'
import SearchResult from '@/components/main/search/SearchResult.vue'

const searchResults = ref([])
</script>

<template>
  <div class="main-body">
    <aside class="sidebar">
      <SideBar />
    </aside>

    <div class="wrap">
      <SummaryHeader />
      <!-- ✅ 검색창 넣기 -->
      <div class="body-wrap">
        <SummaryBody v-if="!searchResults.length" />
        <SearchResult v-else :results="searchResults" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  width: 100%;
  background-color: var(--light-white);
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.main-body {
  display: flex;
  background-color: #fff5f5;
}
.sidebar {
  width: 300px;
}

.body-wrap {
  display: flex;
  justify-content: center;
}
</style>
