<script setup>
const props = defineProps({
  results: Array,
})
</script>

<template>
  <div v-if="results.length" class="search-result">
    <h3>🔍 검색 결과</h3>
    <ul>
      <li v-for="item in results" :key="item.id">
        <strong>{{ item.title }}</strong> - {{ item.amount.toLocaleString() }}원 ({{ item.memo }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-result {
  padding: 1rem;
  margin-top: 1rem;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.search-result ul {
  list-style: none;
  padding: 0;
}

.search-result li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
