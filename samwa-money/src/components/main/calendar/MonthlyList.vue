<template>
  <div class="monthly-detail">
    <h2>{{ month }}월 수입/지출 내역</h2>

    <ul v-if="filteredItems.length > 0">
      <li
        v-for="(item, index) in filteredItems"
        :key="index"
        class="item"
      >
        <span>{{ item.date }}</span>
        <span>{{ item.type }}</span>
        <span>{{ item.amount.toLocaleString() }}원</span>
      </li>
    </ul>

    <p v-else class="empty">해당 달에는 내역이 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  month: {
    type: Number,
    required: true
  }
})

const allData = ref([
  { date: '2025-03-01', type: '수입', amount: 100000 },
  { date: '2025-03-05', type: '지출', amount: 20000 },
  { date: '2025-04-01', type: '수입', amount: 120000 },
  { date: '2025-04-07', type: '지출', amount: 30000 },
  { date: '2025-05-10', type: '수입', amount: 99999 },
])

const filteredItems = computed(() =>
  allData.value.filter(item => {
    const itemMonth = new Date(item.date).getMonth() + 1
    return itemMonth === props.month
  })
)
</script>

<style scoped>
.monthly-detail {
  background-color: var(--light-white);
  border: 2px solid var(--light-yellow);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(255, 182, 193, 0.15);
}

h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--light-yellow);
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed var(--light-yellow);
  font-size: 15px;
}

.empty {
  color: #888;
  text-align: center;
  padding: 1rem 0;
}
</style>
