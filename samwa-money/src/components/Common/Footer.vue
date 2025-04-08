<template>
  <<<<<<< HEAD:samwa-money/src/views/Main.vue
  <div class="main-container">
    <!-- 검색 바 컴포넌트 삽입 -->
    <SearchBar />

    <!-- 아래에 기존 내역, 목록 등 추가하면 됨 -->
    <div class="content-area">
      <p>여기에 내역 리스트나 데이터 표시할 수 있어요</p>
    </div>
  </div>
  <div>Footer</div>
</template>

<script setup>
import SearchBar from '@/components/main/search/SearchBar.vue'
</script>

<style scoped>
.main-container {
  padding: 20px;
}
</style>
