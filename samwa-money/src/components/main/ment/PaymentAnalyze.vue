<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted, watchEffect, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'
import { usePaymentStore } from '@/stores/paymentAddStore'
import KidneyImg from '@/assets/img/콩팥이.png'
import SadKidneyImg from '@/assets/img/슬픈콩팥이.png'
import { fetchMents } from '@/api/ment.js'

const paymentStore = usePaymentStore()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const { currentMonth, expenseTotal } = storeToRefs(paymentStore)

const ments = ref([])
const isDanger = ref(false)
const selectedMent = ref('멘트 로딩 중...')

onMounted(async () => {
  try {
    ments.value = await fetchMents()
    updateMent()
  } catch (e) {
    selectedMent.value = '😢 멘트를 불러오지 못했어요.'
  }
})

const updateMent = () => {
  const expenseGoal = user.value.expense_limit
  const totalExpense = expenseTotal.value

  for (const ment of ments.value) {
    if (evaluateCondition(ment.condition, { expenseGoal, totalExpense })) {
      selectedMent.value = ment.message

      // 위험 여부 판단
      if (['1', '2', '3'].includes(ment.id)) {
        isDanger.value = true
      } else {
        isDanger.value = false
      }
      break
    }
  }
}

const evaluateCondition = (condition, vars) => {
  try {
    const fn = new Function(...Object.keys(vars), `return (${condition});`)
    return fn(...Object.values(vars))
  } catch (e) {
    console.error('조건 파싱 실패:', e)
    return false
  }
}

watchEffect(() => {
  updateMent()
})

watch(currentMonth, () => {
  updateMent()
})
</script>

<template>
  <div class="container">
    <p class="speech-bubble">{{ selectedMent }}</p>
    <img v-if="!isDanger" :src="KidneyImg" alt="콩팥" class="kidney" />
    <img v-else :src="SadKidneyImg" alt="슬픈콩팥" class="sad-kidney" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: var(--space-m);
}

.kidney {
  width: 5%;
}

.sad-kidney {
  width: 6%;
}

.speech-bubble {
  position: relative;
  background-color: var(--light-yellow);
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 400px;
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--black);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  white-space: pre-line;
}

.speech-bubble::before {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 8px 0 8px 10px;
  border-style: solid;
  border-color: transparent transparent transparent var(--light-yellow);
}
</style>
