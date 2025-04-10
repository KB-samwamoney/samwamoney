<script setup>
import { ref } from 'vue';
const imgUrl = ref()

</script>

<template>
  <div class="container">
    <div class="img-container">
      <span v-if="!imgUrl">x</span>
      <img :src="imgUrl" alt="" class="img">
    </div>



    <div class="title-container">
      <h1>내역</h1>
    </div>

    <div class="amount-container">
      <div>월급</div>
      <div class="amount">100000</div>
    </div>


    <div class="category-container">
      <div>카테고리</div>
      <div class="category">급여</div>
    </div>


    <div class="date-container">
      <div>날짜</div>
      <div class="date">2024.03.03</div>
    </div>


    <div class="memo-container">
      <div>메모</div>
      <div class="memo">내용</div>
    </div>

    <div class="buttons">
      <button class="btn">취소</button>
      <button class="btn">수정</button>
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
