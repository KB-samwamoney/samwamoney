<script setup>
import { usePaymentStore } from '@/stores/paymentAddStore'
import { onMounted, ref } from 'vue'

const paymentStore = usePaymentStore()
const title = ref('')

onMounted(async () => {
  if (paymentStore.paymentList.length === 0) {
    await paymentStore.fetchPayments()
  }
  await paymentStore.searchPayment('2dp0ntg')
  title.value = paymentStore.findPayment.title
})
</script>

<template>
  <div class="container">
    <div>
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 738px;
  max-height: 112px;
  margin: auto;
  padding: 2rem 0;
}

h1 {
  font-size: 60px;
}
</style>
