<script setup>
import PaymentFormUpdate from '@/components/payment-update/PaymentFormUpdate.vue';


import { ref } from 'vue';
import { useRoute } from 'vue-router'
// 주소 아이디값 가져오기
const route = useRoute()
const paymentId = ref(route.params.id)
</script>

<template>
  <PaymentFormUpdate :id="paymentId" />
</template>

<style scoped></style>
