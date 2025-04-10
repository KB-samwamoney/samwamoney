<script setup>
import { usePaymentStore } from '@/stores/paymentAddStore'
import { useToastStore } from '@/stores/toastStore'
import { onMounted, ref } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
const paymentStore = usePaymentStore()
const toastStore = useToastStore()
const router = useRouter()
const titleInput = ref('')

const props = defineProps({
  id: Number,
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

//이미지를 문자열로 변환해주는 로직
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
const handleChangeImg = async (event) => {
  const file = event.target.files[0]
  if (file) {
    imgUrl.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
  if (imgUrl.value) {
    baseImg.value = await fileToBase64(imgUrl.value)
  }
  imgUrl.value = baseImg.value
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
      imgUrl: imgUrl.value,
    }
    await paymentStore.updatePayment(newPayment, props.id)
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
  await paymentStore.searchPayment(props.id)

  date.value = paymentStore.findPayment.date
  amount.value = Number(paymentStore.findPayment.amount).toLocaleString()
  memo.value = paymentStore.findPayment.memo
  imgUrl.value = paymentStore.findPayment.imgUrl
  type.value = paymentStore.findPayment.type
  title.value = paymentStore.findPayment.title

  await paymentStore.getcategoryList(type.value)

  categoryName.value = paymentStore.findPayment.category
  categoryIcon.value = paymentStore.findPayment.category

  category.value = paymentStore.categoryList.find(
    (cat) => cat.name === categoryName.value
  ) || ''  // 없을 경우 빈 문자열로 fallback

  titleInput.value?.focus()
})
</script>

<template>
  <div class="container">
    <div class="title-container">
      <input class="title-input" ref="titleInput" type="text" v-model="title" />
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
            {{ category.name }}{{ category.icon }}
          </option>
        </select>
      </div>
    </div>
    <hr />
    <div class="amount-container">
      <label class="amount-title">금액 입력</label>
      <input type="text" class="amount-input" placeholder="금액을 입력하세요" v-model="amount" @input="handleAmountInput"
        value="" />
    </div>
    <hr />
    <div class="date-container">
      <label>날짜선택 :</label>
      <input type="date" class="date-input" ref="dateInput" v-model="date" @focus="openDatePicker" />
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
  gap: 20px;
  width: 680px;
  margin: 40px auto;
  padding: 28px 32px;
  background-color: #fffbe6;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

/* ------ 제목 ------ */
.title-container {
  text-align: center;
}

.title-input {
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border: 1.5px solid #ccc;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  padding: 8px 12px;
  transition: border-color 0.3s;
}

.title-input:focus {
  border-color: #ffd24c;
  outline: none;
}

/* ------ 카테고리 ------ */
.category-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-title label {
  font-size: 18px;
  font-weight: 600;
}

.category-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.expenses-income {
  display: flex;
  gap: 20px;
}

.toggle-btn {
  padding: 6px 14px;
  border-radius: 8px;
  background-color: #f2f2f2;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.selected-income {
  background-color: #91d5a7;
  color: #fff;
}

.selected-expense {
  background-color: #f66e6e;
  color: #fff;
}

.category-input {
  font-weight: bold;
  text-align: center;
  width: 240px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 0 12px;
  font-size: 15px;
  background-color: white;
}

/* ------ 금액, 날짜 ------ */
.amount-container,
.date-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.amount-title,
.date-title,
.memo-title,
.upload-label {
  font-size: 18px;
  font-weight: 600;
}

.amount-input,
.date-input {
  width: 240px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 16px;
  transition: border-color 0.3s;
}

.amount-input:focus,
.date-input:focus {
  border-color: #ffd24c;
  outline: none;
}

/* ------ 메모 ------ */
.memo-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

textarea {
  height: 100px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 12px;
  font-size: 15px;
  resize: none;
  background-color: white;
}

textarea:focus {
  border-color: #ffd24c;
  outline: none;
}

/* ------ 이미지 업로드 ------ */
.upload-container {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  justify-content: space-between;
}

.upload-box {
  width: 160px;
  height: 160px;
  border-radius: 10px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  border: 2px dashed #ccc;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s;
}

.upload-box:hover {
  border-color: #ffd24c;
}

.preview-img {
  font-size: 15px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.imgdelete-btn {
  position: absolute;
  right: -6px;
  top: -6px;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border: 1px solid #888;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.imgdelete-btn:hover {
  transform: scale(1.15);
}

/* ------ 버튼 ------ */
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
}

.btn {
  width: 100px;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.btn.cancel {
  background-color: #e0e0e0;
  color: #333;
}

.btn.confirm {
  background-color: #ffd24c;
  color: #333;
}

.btn:hover {
  transform: scale(1.05);
}
</style>
