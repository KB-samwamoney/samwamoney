<script setup>
import PaymentDetailList from '@/components/payment-detail/PaymentDetailList.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const paymentId = ref(route.params.id)


</script>


<template>
  <PaymentDetailList :id="Number(paymentId)" />
</template>

<style scoped></style>
