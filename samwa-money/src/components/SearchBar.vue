<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <select class="search-select">
        <option value="search_title">제목</option>
        <option value="search_cash">금액</option>
        <option value="search_memo">메모</option>
      </select>
      <input
        :type="searchType === 'search_cash' ? 'number' : 'text'"
        v-model="searchKeyword"
        placeholder="검색어를 입력하세요."
        class="search-input"
      />
      <button class="search-btn" @click="handleSearch">🔍</button>
    </div>
    <div class="search-category">
      <div class="cat">
        <div class="cat_food">식비</div>
      </div>
      <div class="cat">
        <div class="cat_shpping">쇼핑</div>
      </div>
      <div class="cat">
        <div class="cat_money">용돈</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchKeyword = ref('')

const handleSearch = () => {
  console.log('검색어:', searchKeyword.value)
  // 여기에 필터된 결과 fetch 또는 emit 등 원하는 로직 추가
}
</script>

<style scoped src="@/assets/search.css"></style>
