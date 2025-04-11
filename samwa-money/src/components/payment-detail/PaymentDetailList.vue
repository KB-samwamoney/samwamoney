<script setup>
import { ref, onMounted } from 'vue'
import { useToastStore } from '@/stores/toastStore'
import { usePaymentStore } from '@/stores/paymentAddStore'
import { useRouter } from 'vue-router'
import KBIMG from '@/assets/img/KB.png'

const toastStore = useToastStore()

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
  router.go(-1)
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

const handleDelete = async () => {
  const confirmed = window.confirm('정말로 삭제하시겠습니까? 삭제한 데이터는 복구할 수 없습니다.')
  if (!confirmed) {
    toastStore.showToast('삭제가 취소되었습니다.')
    return
  }

  try {
    await paymentStore.deletePayment(props.id)
    toastStore.showToast('내역이 삭제되었습니다.')
    router.push('/') // 삭제 후 홈으로 보내거나, list 페이지로 보내기
  } catch (err) {
    console.error(`내역 삭제 실패: ${err}`)
    toastStore.showToast('삭제 중 오류가 발생했습니다.')
  }
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
        <div>제목</div>
        <div class="amount">{{ title }}</div>
      </div>

      <div class="amount-container">
        <div>금액</div>
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

    <div class="all-buttons">
      <div class="back">
        <button class="go-back" @click="goBack">뒤로</button>
      </div>
      <div class="buttons">
        <button class="save-button" @click="goUpDate">수정</button>
        <button class="delete-button" @click.stop.prevent="handleDelete(id)">삭제</button>
      </div>
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
  height: 300px;
  width: calc(100% - 2rem);
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-gray);
  border-radius: var(--radius);
  overflow: hidden;
}

.img-container {
  border-radius: var(--radius);
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.all-buttons {
  display: flex;
  align-items: center;
}

.buttons {
  display: flex;
  width: calc(100% - 2rem);
  gap: 20px;
  justify-content: right;
  margin-right: var(--space-l);
  margin-bottom: var(--space-m);
}

.content-conatiner {
  margin: var(--space-m);
  padding-bottom: var(--space-m);
}

.save-button {
  background-color: var(--green);
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

.save-button:hover {
  transform: translateY(-2px);
}

.action-buttons {
  display: flex;
  gap: var(--space-m);
  margin-top: var(--space-l);
  justify-content: center;
}

.delete-button {
  background-color: var(--danger);
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

.delete-button:hover {
  transform: translateY(-2px);
}

.back {
  display: flex;
  width: calc(100% - 2rem);
  gap: 20px;
  justify-content: start;
  margin: 0 var(--space-m) var(--space-m) var(--space-l);
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
