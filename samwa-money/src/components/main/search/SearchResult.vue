<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDetail = (id) => {
  router.push({ name: 'payment-detail', params: { id } })
}

const props = defineProps({
  results: Array,
})

// 한 페이지에 5개씩
const itemsPerPage = 5
const currentPage = ref(1)

// 전체 페이지 수
const totalPages = computed(() => Math.ceil(props.results.length / itemsPerPage))

// 현재 페이지 데이터
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return props.results.slice(start, start + itemsPerPage)
})

/* --------------------- 페이지네이션 그룹 기능 --------------------- */
const pagesPerGroup = 5
const currentGroup = ref(0) // 현재 그룹 번호 (0부터 시작)

// 현재 그룹의 페이지 번호들
const visiblePages = computed(() => {
  const start = currentGroup.value * pagesPerGroup + 1
  const end = Math.min(start + pagesPerGroup - 1, totalPages.value)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// 그룹 이동
const maxGroup = computed(() => Math.floor((totalPages.value - 1) / pagesPerGroup))
const maxGroupReached = computed(() => currentGroup.value >= maxGroup.value)

const goToPage = (page) => {
  currentPage.value = page
}

const goPrevPageGroup = () => {
  if (currentGroup.value > 0) {
    currentGroup.value--
    currentPage.value = currentGroup.value * pagesPerGroup + 1
  }
}

const goNextPageGroup = () => {
  if (currentGroup.value < maxGroup.value) {
    currentGroup.value++
    currentPage.value = currentGroup.value * pagesPerGroup + 1
  }
}
</script>

<template>
  <div v-if="results.length" class="search-result">
    <h3>🔍 검색 결과</h3>
    <ul>
      <li
        v-for="item in paginatedResults"
        :key="item.id"
        class="result-item"
        @click="goToDetail(item.id)"
      >
        <div class="item-header">
          <span class="title"> {{ item.icon }} {{ item.title }} </span>
          <span class="amount" :class="item.type"> {{ item.amount.toLocaleString() }}원 </span>
        </div>
        <div class="date">{{ item.date }}</div>
      </li>
    </ul>

    <!-- 페이지네이션 -->
    <div class="pagination-wrapper">
      <button @click="goPrevPageGroup" :disabled="currentGroup === 0">◀</button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>

      <button @click="goNextPageGroup" :disabled="maxGroupReached">▶</button>
    </div>
  </div>
</template>

<style scoped>
.result-item {
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: var(--light-white);
  border-radius: 8px;
  border: 1px solid var(--baby-pink);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.2s,
    background-color 0.2s;
}

.result-item:hover {
  transform: translateY(-3px);
  background-color: var(--hover);
}

.item-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
}

.amount.income {
  color: var(--blue);
}

.amount.expense {
  color: var(--danger);
}

.amount {
  font-weight: bold;
  color: var(--black);
}

.date {
  color: var(--dark-gray);
  font-size: 0.9rem;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  flex-wrap: wrap;
}

.pagination-wrapper button {
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--baby-pink);
  background: var(--light-white);
  cursor: pointer;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s;
  color: var(--black);
}

.pagination-wrapper button:hover {
  background-color: var(--hover);
}

.pagination-wrapper button.active {
  background: var(--blue);
  color: var(--white);
  font-weight: bold;
  border-color: var(--blue);
}

.pagination-wrapper button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.result-item {
  cursor: pointer;
  transition: background-color 0.2s;
}
.result-item:hover {
  background-color: #f9f9f9;
}
</style>
