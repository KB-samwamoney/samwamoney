<script setup>
import PaymentFormUpdate from '@/components/payment-update/PaymentFormUpdate.vue';


import { ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const paymentId = ref(route.params.id)
</script>

<template>
  <PaymentFormUpdate :id="paymentId" />
</template>

<style scoped></style>
