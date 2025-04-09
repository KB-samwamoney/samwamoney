import { ref} from 'vue'
import { defineStore } from 'pinia'
import api from '@/utils/axios'
import { useAuthStore } from '@/stores/authStore.js'


export const usePaymentStore = defineStore('payment', () => {
const authStore = useAuthStore()
  const loading = ref(false)
  const error = ref(null)

  const paymentList = ref([])
  const categoryList = ref([])

  const getcategoryList = async (paymentType) => {
    try {
      loading.value= true
      const response = await api.get(`/Category`)
      categoryList.value = response.data.filter(list=> list.type === paymentType)
    } catch (error) {
      console.log(`카테고리 불러오기 실패${error}`);
    } finally {
      loading.value=false
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
      console.log(`${error}`);

    } finally {
      loading.value=false
    }

  }


  return {loading, error ,paymentList, categoryList, getcategoryList, createPayment}
})
