<template>
  <div class="p-4">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="이름을 검색하세요"
      class="border p-2 rounded w-full"
    />

    <ul class="mt-4">
      <li v-for="(name, index) in filteredNames" :key="index" class="p-2 border-b">
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      names: ['홍길동', '김철수', '이영희', '박영수', '최지훈', '한가은', '강동원'],
    }
  },
  computed: {
    filteredNames() {
      return this.names.filter((name) => name.includes(this.searchQuery))
    },
  },
}
</script>
