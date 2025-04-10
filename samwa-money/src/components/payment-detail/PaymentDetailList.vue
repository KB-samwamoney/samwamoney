<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePaymentStore } from '@/stores/paymentAddStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number,
})

const route = useRoute()
const router = useRouter()
const paymentStore = usePaymentStore()

const imgUrl = ref('')
const title = ref('')
const memo = ref('')
const date = ref('')
const category = ref('')
const amount = ref('')

const goBack = () => {
  router.back()
}

const goUpDate = () => {
  router.push({ name: 'payment-update' })
}

onMounted(async () => {
  const paymentId = route.params.id
  console.log('✅ route id:', paymentId)

  await paymentStore.fetchPayments(Number(props.id))
  await paymentStore.searchPayment(Number(props.id))

  const payment = paymentStore.findPayment
  console.log('📦 상세 데이터:', payment)

  imgUrl.value = payment.imgUrl
  title.value = payment.title
  memo.value = payment.memo
  date.value = payment.date
  category.value = payment.category
  amount.value = payment.amount
})
</script>

<template>
  <div class="container">
    <div class="img-container">
      <span v-if="imgUrl === ''">x</span>
      <img :src="imgUrl" alt="" class="img">
    </div>



    <div class="title-container">
      <h1>내역</h1>
    </div>

    <div class="amount-container">
      <div>월급</div>
      <div class="amount">{{ amount }}</div>
    </div>


    <div class="category-container">
      <div>카테고리</div>
      <div class="category">{{ category }}</div>
    </div>


    <div class="date-container">
      <div>날짜</div>
      <div class="date">{{ date }}</div>
    </div>


    <div class="memo-container">
      <div>메모</div>
      <div class="memo">{{ memo }}</div>
    </div>

    <div class="buttons">
      <button class="btn" @click="goBack">취소</button>
      <button class="btn" @click="goUpDate">수정</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: calc(100% - 2rem);
  margin: auto;
  padding: 1rem 0;
  font-size: 25px;
  font-weight: 500;
  gap: 10px;
}

.amount,
.memo,
.date,
.category {
  font-size: 25px;
}

.title-container {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 2rem);
  margin: auto;
  padding: 2rem 0;
}

.img-container {
  border: 1px solid red;
  max-height: 300px;
  width: calc(100% - 2rem);
  margin: auto;
  padding: 2rem 0;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.date-container,
.category-container,
.amount-container,
.memo-container,
.date-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2rem);
  margin: auto;
  padding: 2rem 10px;
  max-height: 70px;
  border-bottom: 1px solid var(--dark-gray);
}

.buttons {
  display: flex;
  width: calc(100% - 2rem);
  margin: auto;
  gap: 20px;
  justify-content: right;
}

.btn {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  background-color: #ffe596;
}
</style>
