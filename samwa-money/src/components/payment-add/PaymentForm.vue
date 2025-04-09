<script setup>
import { usePaymentStore } from '@/stores/paymentAddStore';
import { onMounted, ref, watch } from 'vue';

const paymentStore = usePaymentStore()

// 데이터 자장 함수
const title = ref()
const paymentAddDate = ref('')
const selecCategory = ref('')
const paymentAmount = ref('')
const paymentAddImg = ref(null)
const paymentAddMemo = ref('')

//  카테고리 리스트 변경
const selectedPayment = ref()
watch(selectedPayment, (newVal) => {
  selecCategory.value = ''
  if (newVal) {
    paymentStore.getcategoryList(newVal)
  }
})

const handleChangeImg = (event) => {
  const file = event.target.files[0]
  if (!file) {
    paymentAddImg.value = null
    return
  }
  paymentAddImg.value = file;
  console.log(paymentAddImg);

}

const imageDelete = () => {
  paymentAddImg.value = null
}

const formatWithComma = (value) => {
  const onlyNumber = value.replace(/[^0-9]/g, '') // 숫자만 추출
  return onlyNumber ? Number(onlyNumber).toLocaleString() : ''
}

const handleAmountInput = (event) => {
  const value = event.target.value
  paymentAmount.value = formatWithComma(value)
}
onMounted(() => {
  title.value?.focus()
})

</script>

<template>

  <div class="container">
    <section class="payment-body">
      <div class="title-container">
        <label>제목 :</label>
        <input type="text" placeholder="제목을 입력하세요" class="title-input" ref='title' v-model="title">
      </div>

      <div class="date-container">
        <label>날짜선택 :</label>
        <input type="date" class="date-input" v-model="paymentAddDate">
      </div>

      <div class="category-container">
        <label>카테고리 :</label>
        <div class="expenses-income">
          <div>
            <input type="radio" name="select-category" value="income" id="income" hidden v-model="selectedPayment">
            <label for="income" class="toggle-btn" :class="{ 'selected-income': selectedPayment === 'income' }"
              @click="filterPayments">💰 수입
            </label>
          </div>
          <p>|</p>
          <div>
            <input type="radio" name="select-category" value="expense" id="expense" hidden v-model="selectedPayment">
            <label for="expense" class="toggle-btn" :class="{ 'selected-expense': selectedPayment === 'expense' }"
              @click="filterPayments">
              💸 지출
            </label>
          </div>
        </div>
        <select class=" category-input" v-model="selecCategory">
          <option disabled selected value="">카테고리 선택</option>
          <option v-for="category in paymentStore.categoryList" :key="category.id" :value="category.id">
            {{ category.name }}{{ category.icon }}</option>
        </select>
      </div>

      <div class="amount-container">
        <label>금액입력 : </label>
        <input type="text" class="amount-input" placeholder="금액을 입력하세요" v-model.number="paymentAmount"
          @input="handleAmountInput" value='원'>
      </div>

      <div class="memo-container">
        <div>
          <label>메모 : </label>
        </div>
        <textarea class="textarea-input" placeholder="내용을 입력하세요" v-model="paymentAddMemo"></textarea>
      </div>

      <div class="upload-container">
        <label class="upload-label">사진 첨부 :</label>
        <label for="uploadImg" class="upload-box">
          <span>{{ paymentAddImg ? paymentAddImg.name : '+' }}</span>
          <input type="file" id="uploadImg" hidden accept="image/*" @change="handleChangeImg" />
        </label>

        <button class="imgdelete-btn" @click="imageDelete" v-if="paymentAddImg">x</button>

      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
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
  color: black;
}

.toggle-btn.selected-expense {
  background-color: var(--danger);
  color: black;
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
</style>
