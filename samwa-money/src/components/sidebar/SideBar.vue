<script setup>
import PlusButton from '../button/PlusButton.vue'
</script>

<template>
  <nav>
    <div>
      <ul>
        <li>
          <router-link to="/">위장부</router-link>
        </li>
        <li>
          <router-link to="/payment-summary">간편요약</router-link>
        </li>
        <li>
          <router-link to="/setting">내장설정</router-link>
        </li>
        <li>
          <router-link to="/my-page">뇌센터</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
