<script setup>
import { usePaymentStore } from '@/stores/paymentAddStore';
import { useToastStore } from '@/stores/toastStore';
import { onMounted, ref } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
const paymentStore = usePaymentStore()
const toastStore = useToastStore()
const router = useRouter()
const previewUrl = ref(null)


const date = ref('')
const type = ref('')
const category = ref('')
const amount = ref('')
const memo = ref('')
const imgUrl = ref(null)

const handleChangeImg = (event) => {
  const file = event.target.files[0]
  if (file) {
    imgUrl.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}
//이미지 삭제
const imageDelete = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value) // 메모리 누수 방지
  }
  imgUrl.value = null
  previewUrl.value = null
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
    let base64Img = ''
    if (imgUrl.value) {
      base64Img = await fileToBase64(imgUrl.value)
    }
    const newPayment = {

      date: date.value,
      category: category.value,
      amount: amount.value,
      memo: memo.value,
      imgUrl: base64Img
    }
    await paymentStore.createPayment(newPayment)
    toastStore.showToast('저장되었습니다')
    await router.push({ name: 'main' })
  } catch (error) {
    console.log(error);

  }
}

const cancel = () => {
  router.back()
}

onMounted(async () => {
  if (paymentStore.paymentList.length === 0) {
    await paymentStore.fetchPayments()
  }
  await paymentStore.serchPayment('2dp0ntg')


  date.value = paymentStore.findPayment.date
  amount.value = paymentStore.findPayment.amount
  memo.value = paymentStore.findPayment.memo
  imgUrl.value = paymentStore.findPayment.imgUrl
  type.value = paymentStore.findPayment.type

  await paymentStore.getcategoryList(type.value)

  category.value = paymentStore.findPayment.category
})

</script>

<template>

  <div class="container">
    <div class="category-container">
      <div class="category-title"><label>카테고리</label></div>
      <div class="category-body">
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
          <option v-for="category in paymentStore.categoryList" :key="category.id" :value="category.id">
            {{ category.name }}{{ category.icon }}</option>
        </select>
      </div>
    </div>
    <hr>
    <div class="amount-container">
      <label class="amount-title">금액입력</label>
      <input type="text" class="amount-input" placeholder="금액을 입력하세요" v-model.number="amount" @input="handleAmountInput"
        value=''>
    </div>
    <hr>
    <div class="date-container">
      <label class="date-title">날짜선택</label>
      <label @click="openDatePicker">
        <input type="date" class="date-input" v-model="date" ref="dateInput" />
      </label>
    </div>
    <hr>

    <div class="memo-container">
      <div>
        <label class="memo-title">메모</label>
      </div>
      <textarea class="textarea-input" placeholder="내용을 입력하세요" v-model="memo"></textarea>
    </div>
    <hr>
    <div class="upload-container">
      <label class="upload-label">사진 </label>
      <label for="uploadImg" class="upload-box">
        <span v-if="!imgUrl">+</span>
        <img v-else :src="imgUrl" alt="미리보기 이미지" class="preview-img" />
        <input type="file" id="uploadImg" hidden accept="image/*" @change="handleChangeImg" />
      </label>
      <button class="imgdelete-btn" @click="imageDelete" v-if="previewUrl">x</button>
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
  margin: auto;
  padding: 2rem 0;

}

.category-title label,
.date-title,
.amount-title,
.memo-title,
.upload-label {
  font-size: 24px;
  font-weight: 600;
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
  color: black;
}

.toggle-btn.selected-expense {
  background-color: var(--danger);
  color: black;
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
  background-color: #FFE596;
}

.btn.confirm {
  background-color: #FFE596;
}
</style>
