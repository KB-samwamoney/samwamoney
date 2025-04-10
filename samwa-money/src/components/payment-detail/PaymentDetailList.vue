<script setup>
import { ref, onMounted } from 'vue'
import { usePaymentStore } from '@/stores/paymentAddStore'
import { useRouter } from 'vue-router'
import KBIMG from '@/assets/img/KB.png'

const props = defineProps({
  id: Number,
})

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
  await paymentStore.fetchPayments()
  await paymentStore.searchPayment(props.id)

  const payment = paymentStore.findPayment
  // console.log('📦 상세 데이터:', payment)

  imgUrl.value = payment.imgUrl
  title.value = payment.title
  memo.value = payment.memo
  date.value = payment.date
  category.value = payment.category
  amount.value = payment.amount
})

const onImgError = (event) => {
  event.target.src = KBIMG
}
</script>

<template>
  <div class="container">
    <div class="img-container">
      <img :src="imgUrl" alt="상세 이미지" class="img" @error="onImgError" />
    </div>
    <div class="content-conatiner">
      <div class="title-container">
        <h1>내역</h1>
      </div>

      <div class="amount-container">
        <div>월급</div>
        <div class="amount">{{ amount.toLocaleString() }}</div>
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
    </div>

    <div class="buttons">
      <button class="go-back" @click="goBack">뒤로</button>
      <button class="save-button" @click="goUpDate">수정</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: var(--space-l);
}

.container {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: calc(100% - 2rem);
  margin: auto;
  padding: 1rem 0;
  font-size: 20px;
  font-weight: 500;
  gap: 5px;
  margin-top: var(--space-l);
}

.amount,
.memo,
.date,
.category {
  font-size: 20px;
}

.title-container {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 2rem);
  padding: var(--space-m) var(--space-m);
}

.img-container {
  max-height: 300px;
  width: calc(100% - 2rem);
  margin: auto;
  padding: 2rem 0;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-gray);
  border-radius: var(--radius);
}

.img-container img {
  border-radius: var(--radius);
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

.memo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
  text-align: end;
}

.buttons {
  display: flex;
  width: calc(100% - 2rem);
  gap: 20px;
  justify-content: right;
  margin-right: var(--space-m);
  margin-bottom: var(--space-m);
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
  background-color: var(--light-yellow);
}

.content-conatiner {
  margin: var(--space-m);
  padding-bottom: var(--space-m);
}

.save-button {
  background-color: var(--danger);
  color: var(--light-white);
  font-size: var(--space-m);
  font-weight: 700;
  border: none;
  border-radius: var(--radius);
  padding: var(--space-m) var(--space-l);
  cursor: pointer;
  box-shadow: var(--space-s);
  transition: all 0.2s ease;
  font-family: 'Pretendard', sans-serif;
}

.save-button:hover {
  transform: translateY(-2px);
}

.action-buttons {
  display: flex;
  gap: var(--space-m);
  margin-top: var(--space-l);
  justify-content: center;
}

.go-back {
  background-color: var(--light-yellow);
  color: var(--black);
  font-size: var(--space-m);
  font-weight: 700;
  border: none;
  border-radius: var(--radius);
  padding: var(--space-m) var(--space-l);
  cursor: pointer;
  box-shadow: var(--space-s);
  transition: all 0.2s ease;
  font-family: 'Pretendard', sans-serif;
}

.go-back:hover {
  transform: translateY(-2px);
}
</style>
