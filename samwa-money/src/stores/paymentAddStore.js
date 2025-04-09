import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/utils/axios'
import { useAuthStore } from '@/stores/authStore.js'

export const usePaymentStore = defineStore('payment', () => {
  const authStore = useAuthStore()

  const loading = ref(false)
  const error = ref(null)

  const paymentList = ref([])     // 결제 내역
  const categoryList = ref([])    // 카테고리 목록

  const getcategoryList = async (paymentType) => {
    try {
      loading.value = true
      const response = await api.get(`/Category`)
      categoryList.value = response.data.filter(
        list => list.type === paymentType
      )
    } catch (error) {
      console.error(`카테고리 불러오기 실패: ${error}`)
    } finally {
      loading.value = false
    }
  }

  const createPayment = async (paymentData) => {
    loading.value = true
    error.value = null

    try {
      const newPayment = {
        userId: authStore.user.userId,
        ...paymentData
      }
      const response = await api.post(`/Balance`, newPayment)
      paymentList.value.push(response.data)
    } catch (error) {
      console.error(`결제 등록 실패: ${error}`)
    } finally {
      loading.value = false
    }
  }

  // 수입지출내역 불러오기
  const fetchPayments = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/Balance?userId=${authStore.user.userId}`)
      paymentList.value = response.data
    } catch (err) {
      error.value = err
      console.error('결제 데이터 불러오기 실패:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    paymentList,
    categoryList,
    getcategoryList,
    createPayment,
    fetchPayments
  }
})
