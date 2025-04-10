<script setup>
import SideBar from '@/components/sidebar/SideBar.vue'
import SummaryBody from '@/components/payment-summary/SummaryBody.vue'
import SummaryHeader from '@/components/payment-summary/SummaryHeader.vue'
</script>

<template>
  <div class="main-body">
    <div class="side-bar">
      <SideBar />
    </div>

    <div class="wrap">
      <SummaryHeader />
      <div class="body-wrapper">
        <SummaryBody />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-body {
  display: flex;
  flex: 1;
  background-color: var(--light-white);
}

.wrap {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--space-l);
  margin-bottom: var(--space-l);
  box-sizing: border-box;
  padding: 0 1rem;
}

.side-bar {
  min-width: 300px;
  background-color: var(--lighter-yellow);
}

.body-wraper {
  width: 100%;
  display: flex;
  gap: 100px;
  margin-top: 100px;
  margin-bottom: 100px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
