<script setup>
import SideBar from '@/components/sidebar/SideBar.vue'
import SummaryBody from '@/components/payment-summary/SummaryBody.vue'
import SummaryHeader from '@/components/payment-summary/SummaryHeader.vue'
</script>

<template>
  <div class="main-body">
    <!-- 좌측 메뉴바 -->
    <aside class="sidebar">
      <SideBar />
    </aside>
    <div class="wrap">
      <SummaryHeader />
      <SummaryBody />
    </div>
  </div>
</template>

<style scoped>
.main-body {
  display: flex;
}
.sidebar {
  width: 300px;
  background-color: #fff6da;
}
</style>
