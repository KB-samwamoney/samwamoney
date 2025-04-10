<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="sidebar">
    <ul>
      <li :class="{ active: route.path === '/' }">
        <router-link to="/">위장부</router-link>
      </li>
      <li :class="{ active: route.path === '/payment-summary' }">
        <router-link to="/payment-summary">간편요약</router-link>
      </li>
      <li :class="{ active: route.path === '/setting' }">
        <router-link to="/setting">내장설정</router-link>
      </li>
      <li :class="{ active: route.path === '/my-page' }">
        <router-link to="/my-page">뇌센터</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background-color: #fefaf2;
  font-weight: bold;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 1.2rem 0;
  font-size: 1.1rem;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.sidebar li a {
  text-decoration: none;
  color: inherit;
}

.sidebar li.active {
  background-color: white;
  border: 2px solid #f7e8a4;
}
</style>
