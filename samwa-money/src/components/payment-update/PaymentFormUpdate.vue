<script setup>
import { usePaymentStore } from '@/stores/paymentAddStore';
import { useToastStore } from '@/stores/toastStore';
import { onMounted, ref } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
const paymentStore = usePaymentStore()
const toastStore = useToastStore()
const router = useRouter()
const titleInput = ref('')

const props = defineProps({
  id: Number
})

const title = ref('')
const date = ref('')
const type = ref('')
const category = ref('')
const categoryName = ref('')
const categoryIcon = ref('')
const amount = ref('')
const memo = ref('')
const previewUrl = ref(null) //이미지 출력관련 함수
const imgUrl = ref(null)
const baseImg = ref(null)
const dateInput = ref('')


const handleChangeImg = async (event) => {
  const file = event.target.files[0]
  if (file) {
    imgUrl.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
  if (imgUrl.value) {
    baseImg.value = await fileToBase64(imgUrl.value)
  }
}
//이미지 삭제
const imageDelete = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value) // 메모리 누수 방지
  }
  imgUrl.value = null
  previewUrl.value = ''
}


const openDatePicker = () => {
  dateInput.value?.showPicker?.() || dateInput.value?.click()
}

watch(type, (newVal) => {
  category.value = ''
  if (newVal) {
    paymentStore.getcategoryList(newVal)
  }
})

// 금액 입력시 숫자만 출력 및 , 표시
const formatWithComma = (value) => {
  const onlyNumber = value.replace(/[^0-9]/g, '') // 숫자만 추출
  return onlyNumber ? Number(onlyNumber).toLocaleString() : ''
}

const handleAmountInput = (event) => {
  const value = event.target.value
  amount.value = formatWithComma(value)
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

const upDatePayment = async () => {
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
    const newPayment = {
      title: title.value,
      date: date.value,
      category: category.value.name || categoryName.value,
      type: type.value,
      amount: Number(String(amount.value).replace(/,/g, '')),
      memo: memo.value,
      icon: category.value.icon || categoryIcon.value,
      imgUrl: baseImg.value,
    }
    await paymentStore.updatePayment(newPayment, 100)
    toastStore.showToast('저장되었습니다')
    await router.push({ name: 'main' })
  } catch (error) {
    console.log('❌ 저장 중 에러 발생:', error)

  }
}

const cancel = () => {
  router.back()
}

onMounted(async () => {
  if (paymentStore.paymentList.length === 0) {
    await paymentStore.fetchPayments()
  }
  await paymentStore.searchPayment(100)


  date.value = paymentStore.findPayment.date
  amount.value = Number(paymentStore.findPayment.amount).toLocaleString()
  memo.value = paymentStore.findPayment.memo
  imgUrl.value = paymentStore.findPayment.imgUrl
  type.value = paymentStore.findPayment.type
  title.value = paymentStore.findPayment.title

  await paymentStore.getcategoryList(type.value)

  categoryName.value = paymentStore.findPayment.category
  categoryIcon.value = paymentStore.findPayment.category

  titleInput.value?.focus()

})
</script>

<template>
  <div class="container">

    <div class="title-container">
      <input class="title-input" ref='titleInput' type="text" v-model="title">
    </div>


    <div class="category-container">
      <div class="category-title"><label>카테고리</label></div>
      <div class="category-body">
        <div class="expenses-income">
          <div>
            <input type="radio" name="select-category" value="income" id="income" hidden v-model="type" />
            <label for="income" class="toggle-btn" :class="{ 'selected-income': type === 'income' }"
              @click="filterPayments">💰 수입
            </label>
          </div>
          <p>|</p>
          <div>
            <input type="radio" name="select-category" value="expense" id="expense" hidden v-model="type" />
            <label for="expense" class="toggle-btn" :class="{ 'selected-expense': type === 'expense' }"
              @click="filterPayments">
              💸 지출
            </label>
          </div>
        </div>
        <select class="category-input" v-model="category">
          <option disabled selected value="">카테고리 선택</option>
          <option v-for="category in paymentStore.categoryList" :key="category.id" :value="category">
            {{ category.name }}{{ category.icon }}</option>
        </select>
      </div>
    </div>
    <hr />
    <div class="amount-container">
      <label class="amount-title">금액입력</label>
      <input type="text" class="amount-input" placeholder="금액을 입력하세요" v-model="amount" @input="handleAmountInput"
        value="" />
    </div>
    <hr />
    <div class="date-container">
      <label>날짜선택 :</label>
      <input type="date" class="date-input" ref="dateInput" v-model="date" @focus="openDatePicker">
    </div>
    <hr />

    <div class="memo-container">
      <div>
        <label class="memo-title">메모</label>
      </div>
      <textarea class="textarea-input" placeholder="내용을 입력하세요" v-model="memo"></textarea>
    </div>
    <hr />
    <div class="upload-container">
      <label class="upload-label">사진 </label>
      <label for="uploadImg" class="upload-box">
        <span v-if="!imgUrl">+</span>
        <img v-else :src="imgUrl" alt="미리보기 이미지" class="preview-img" />
        <input type="file" id="uploadImg" hidden accept="image/*" @change="handleChangeImg" />
      </label>
      <button class="imgdelete-btn" @click="imageDelete" v-if="imgUrl">x</button>
    </div>

    <div class="buttons">
      <button class="btn cancel" @click="cancel">취소</button>
      <button class="btn confirm" @click="upDatePayment">확인</button>
    </div>
  </div>


</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 738px;
  margin: 20px auto;
  padding: 2rem 0;
  background-color: var(--lighter-yellow);
  border-radius: var(--radius);
}

.category-title label,
.date-title,
.amount-title,
.memo-title,
.upload-label {
  font-size: 24px;
  font-weight: 600;
}


.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 738px;
  max-height: 112px;
  margin: auto;
  padding: 2rem 0;
  width: calc(100% - 2rem);
  margin: auto;
}

.title-input {
  width: 100%;
  height: 80px;
  border-radius: var(--radius);
  border: 1px solid var(--dark-gray);
  text-align: center;
  font-size: 50px;
}

.title-input h1 {
  font-size: 60px;
}

/* ------카테고리------ */
.category-container {
  flex-direction: column;
  display: flex;

  width: calc(100% - 2rem);
  margin: auto;
}

.category-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.expenses-income {
  display: flex;
  gap: 30px;
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

/* ------- 컨테이너 -------- */
.amount-container,
.date-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(100% - 2rem);
  margin: auto;
}

/* ---------- 날찌선택 ----------- */
.date-input {
  cursor: pointer;
}



/* --------- 메모 ---------- */
.memo-container {
  display: flex;
  flex-direction: column;
  width: calc(100% - 2rem);
  margin: auto;
}

textarea {
  height: 94px;
  resize: none;
  border-radius: var(--radius);
  padding: 10px;
}

/* -------- 사진 첨부 --------- */
.upload-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: calc(100% - 2rem);
  margin: auto;
}

.upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: var(--light-gray);
  font-size: 30px;
  border-radius: var(--radius);
  border: 1px dotted var(--dark-gray);
  cursor: pointer;
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

/* ---------  input 요소---------- */
.category-input,
.amount-input,
.date-input {
  width: 300px;
  height: 42px;
  border-radius: var(--radius);
  border: 1px solid var(--dark-gray);
  text-align: center;
}

/* ------- 번튼 -------- */

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
}

.btn.cancel {
  background-color: #ffe596;
}

.btn.confirm {
  background-color: #ffe596;
}
</style>
