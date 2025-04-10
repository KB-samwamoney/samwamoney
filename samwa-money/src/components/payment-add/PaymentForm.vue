<script setup>
import { usePaymentStore } from '@/stores/paymentAddStore';
import { onMounted, ref, watch } from 'vue';
import ConfirmButton from '../button/ConfirmButton.vue';
import { useToastStore } from '@/stores/toastStore';
import PaymentModal from './PaymentModal.vue';
import { useRouter } from 'vue-router';

const paymentStore = usePaymentStore()
const toastStore = useToastStore()
const router = useRouter()

const dateInput = ref(null)

// 데이터 자장 함수
const title = ref('')
const titleInput = ref()
const date = ref('')
const category = ref('')
const amount = ref('')
const imgUrl = ref(null)
const memo = ref('')
const type = ref()

//  카테고리 리스트 변경
watch(type, (newVal) => {
  category.value = ''
  if (newVal) {
    paymentStore.getcategoryList(newVal)
  }
})

const handleChangeImg = (event) => {
  const file = event.target.files[0]
  if (!file) {
    imgUrl.value = null
    return
  }
  imgUrl.value = file;
  toastStore.showToast('이미지가 등록되었습니다')
}
//  저장된 이미지 삭제
const imageDelete = () => {
  toastStore.showToast('이미지가 삭제되었습니다')
  imgUrl.value = null
}

// 금액 입력시 숫자만 출력 및 , 표시
const formatWithComma = (value) => {
  const onlyNumber = value.replace(/[^0-9]/g, '') // 숫자만 추출
  return onlyNumber ? Number(onlyNumber).toLocaleString() : ''
}

const handleAmountInput = (event) => {
  const value = event.target.value
  amount.value = formatWithComma(value)
}

// 날짜 입력칸 어디든 클릭시 리스트 출력
const openDatePicker = () => {
  dateInput.value?.showPicker?.() || dateInput.value?.click()
}
//이미지를 문자열로 변환해주는 로직
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

//저장 함수
const createPayment = async () => {
  if (!String(title.value).trim()) {
    toastStore.showToast('제목을 입력해주세요')
    return
  }
  if (!String(date.value).trim()) {
    toastStore.showToast('날짜를 선택해주세요')
    return
  }
  if (!String(amount.value).trim()) {
    toastStore.showToast('금액을 입력해주세요')
    return
  }
  if (!String(category.value).trim()) {
    toastStore.showToast('카테고리를 선택해주세요')
    return
  }
  if (!String(memo.value).trim()) {
    toastStore.showToast('메모를 입력해주세요')
    return
  }

  try {
    let base64Img = ''
    if (imgUrl.value) {
      base64Img = await fileToBase64(imgUrl.value)
    }
    const newPayment = {
      title: title.value,
      date: date.value,
      category: category.value.name,
      icon: category.value.icon,
      amount: Number(String(amount.value).replace(/,/g, '')),
      memo: memo.value,
      imgUrl: base64Img,
      type: type.value
    }
    await paymentStore.createPayment(newPayment)
    toastStore.showToast('저장되었습니다')
    await router.push({ name: 'main' })
  } catch (error) {
    console.log(error);

  }
  finally {
    title.value = ''
    date.value = ''
    category.value = ''
    amount.value = ''
    memo.value = ''
    imgUrl.value = ''
    type.value = ''
  }
}
// 페이지 로드시 제목 입력칸 포커스
onMounted(() => {
  titleInput.value?.focus()
})
const showModal = ref(false)

const confirmSave = async () => {
  showModal.value = false
  await createPayment()
}
const cancelSave = () => {
  showModal.value = false
}
</script>

<template>

  <div class="container">
    <section class="payment-body">
      <div class="title-container">
        <label>제목 :</label>
        <input type="text" placeholder="제목을 입력하세요" class="title-input" ref='titleInput' v-model="title">
      </div>

      <div class="date-container">
        <label>날짜선택 :</label>
        <input type="date" class="date-input" ref="dateInput" v-model="date" @focus="openDatePicker">
      </div>

      <div class="category-container">
        <label>카테고리 :</label>
        <div class="expenses-income">
          <div>
            <input type="radio" name="select-category" value="income" id="income" hidden v-model="type">
            <label for="income" class="toggle-btn" :class="{ 'selected-income': type === 'income' }"
              @click="filterPayments">💰 수입
            </label>
          </div>
          <p>|</p>
          <div>
            <input type="radio" name="select-category" value="expense" id="expense" hidden v-model="type">
            <label for="expense" class="toggle-btn" :class="{ 'selected-expense': type === 'expense' }"
              @click="filterPayments">
              💸 지출
            </label>
          </div>
        </div>
        <select class=" category-input" v-model="category">
          <option disabled selected value="">카테고리 선택</option>
          <option v-for="category in paymentStore.categoryList" :key="category.id" :value="category">
            {{ category.name }}{{ category.icon }}</option>
        </select>
      </div>

      <div class="amount-container">
        <label>금액입력 : </label>
        <input type="text" class="amount-input" placeholder="금액을 입력하세요" v-model.number="amount"
          @input="handleAmountInput" value='원'>
      </div>

      <div class="memo-container">
        <div>
          <label>메모 : </label>
        </div>
        <textarea class="textarea-input" placeholder="내용을 입력하세요" v-model="memo"></textarea>
      </div>

      <div class="upload-container">
        <label class="upload-label">사진 첨부 :</label>
        <label for="uploadImg" class="upload-box">
          <span>{{ imgUrl ? imgUrl.name : '+' }}</span>
          <input type="file" id="uploadImg" hidden accept="image/*" @change="handleChangeImg" />
        </label>

        <button class="imgdelete-btn" @click="imageDelete" v-if="imgUrl">x</button>

      </div>
      <div class="footer-btn">
        <ConfirmButton :name="'취소'" />
        <ConfirmButton @create-payment="createPayment" @click="showModal = true" :name="'완료'" />
      </div>
      <PaymentModal @create-payment="createPayment" :show="showModal" :message="'수입 및 지출 내용을 저장하시겠습니까?'"
        @confirm="confirmSave" @cancel="cancelSave" />
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  height: 730px;
  width: calc(100% - 2rem);
  margin: auto;
  padding: 2rem 0;
}

.payment-body {
  display: flex;
  flex-direction: column;
  width: 708px;
  margin: auto;
  margin-top: 0;
  padding: var(-space-m);
  font-size: 24px;
  gap: var(--space-m);
}

/* 제목 입력 */
.title-container,
.date-container,
.category-container,
.amount-container,
.upload-container {
  display: flex;
  justify-content: space-between;
}

.title-input,
.date-input,
.amount-input,
.upload-box {
  width: 573px;
  height: 42px;
  border-radius: var(--radius);
  border: 1px solid var(--dark-gray);
  text-align: center;
}

/* 카테고리 선택 */
.expenses-income {
  display: flex;
  gap: 8px;
}

.category-input {
  width: 300px;
  height: 42px;
  border-radius: var(--radius);
  border: 1px solid var(--dark-gray);
  text-align: center;
}

.toggle-btn {
  padding: var(--space-s) var(--space-m);
  cursor: pointer;
  border-radius: var(--radius);
  background-color: var(--light-gray);
  color: var(--dark-gray);
}

.selected-income {
  background-color: var(--blue);
  color: var(--dark);
}

.toggle-btn.selected-expense {
  background-color: var(--danger);
  color: var(--dark);
}

.toggle-title {
  color: var(--light-gray);
}

/* 메모 입력 */
.textarea-input {
  width: 708px;
  height: 230px;
  resize: none;
  border-radius: var(--radius);
  border: 1px solid var(--dark-gray);
  padding: var(--space-s);
}


/* img 업로드 */
.upload-container {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: sans-serif;
  position: relative;
}


.upload-box {
  border: 1px dotted var(--dark-gray);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--light-gray);
}

.imgdelete-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  background-color: var(--light-gray);
  border: 1px solid var(--dark-gray);
  border-radius: 50%;
  cursor: pointer;
  right: -5px;
  top: -5px;
  transition: transform 0.2s ease;
}

.imgdelete-btn:hover {
  transform: scale(1.3);
}

.footer-btn {
  display: flex;
  gap: 20px;
  justify-content: right;
}
</style>
