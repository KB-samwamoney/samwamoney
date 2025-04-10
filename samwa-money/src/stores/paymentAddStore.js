import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore.js'
import { fetchCategory, postPayment, fetchPaymentsById } from '@/api/category.js'
import api from '@/utils/axios'

export const usePaymentStore = defineStore('payment', () => {
  const authStore = useAuthStore()

  const loading = ref(false)
  const error = ref(null)

  const paymentList = ref([]) // 결제 내역
  const categoryList = ref([]) // 카테고리 목록
  const findPayment = ref('') // 상세 정보 가져오기
  const viewDate = ref(new Date())

  const setViewDate = (date) => {
    viewDate.value = new Date(date)
  }

  const currentMonth = computed(() => viewDate.value.getMonth() + 1)
  const currentYear = computed(() => viewDate.value.getFullYear())

  //카테고리 리스트 불러오기
  const getcategoryList = async (paymentType) => {
    try {
      loading.value = true
      const data = await fetchCategory()
      categoryList.value = data.filter((list) => list.type === paymentType)
    } catch (error) {
      console.error('❗ 카테고리 로딩 실패:', error)
    } finally {
      loading.value = false
    }
  }
  // 지출 및 수입 정보 저장하기
  const createPayment = async (paymentData) => {
    loading.value = true
    error.value = null

    try {
      const newPayment = {
        userId: authStore.user.userId,
        ...paymentData,
      }

      const savedPayment = await postPayment(newPayment)
      paymentList.value.push(savedPayment)
    } catch (error) {
      console.error('❌ 결제 등록 실패:', error)
    } finally {
      loading.value = false
    }
  }

  // 수입지출내역 불러오기
  const fetchPayments = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await fetchPaymentsById(authStore.user.userId)
      paymentList.value = data
    } catch (err) {
      error.value = err
      console.error('결제 데이터 불러오기 실패:', err)
    } finally {
      loading.value = false
    }
  }

  // 특정 월의 결제 내역만 반환
  const getPaymentsByMonth = (month) => {
    return paymentList.value.filter((payment) => {
      const date = new Date(payment.date)
      return date.getMonth() + 1 === month
    })
  }

  //상세 정보 가져오기
  const searchPayment = async (id) => {
    loading.value = true
    error.value = null
    try {
      if (!Array.isArray(paymentList.value)) {
        throw new Error('paymentList가 배열이 아님!')
      }
      const response = paymentList.value.find((item) => item.id === id)

      if (!response) {
        throw new Error('해당 ID의 정보를 찾을 수 없습니다.')
      }
      findPayment.value = response
      console.log(findPayment.value)
    } catch (err) {
      console.log(`상세 정보 불러오기 실패`, err)
    } finally {
      loading.value = false
    }
  }

  // category 매칭해보기
  const isIncome = (category) => {
    const incomeCategories = [
      '월급',
      '용돈',
      '기타',
      '상여',
      '금융소득',
      '부수입',
      '환급금',
      '투자수익',
      '중고거래',
      '캐시백/포인트',
    ]
    return incomeCategories.includes(category)
  }

  // summary한 정보들
  const summaryItems = computed(() => {
    const date = viewDate.value
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return paymentList.value
      .filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month
      })
      .map((item) => ({
        type: isIncome(item.category) ? '수입' : '지출',
        amount: item.amount,
        date: item.date,
      }))
  })

  // 수입 총 합계
  const incomeTotal = computed(() => {
    return summaryItems.value
      .filter((item) => item.type === '수입')
      .reduce((sum, item) => sum + item.amount, 0)
  })

  // 지출 총 합계
  const expenseTotal = computed(() => {
    return summaryItems.value
      .filter((item) => item.type === '지출')
      .reduce((sum, item) => sum + item.amount, 0)
  })

  // 총 합계
  const totalBalance = computed(() => incomeTotal.value - expenseTotal.value)

  watch(
    summaryItems,
    (val) => {
      console.log('✅ summaryItems 변경됨')
    },
    { deep: true, immediate: true },
  )

  // 상세정보 수정하기
const updatePayment = async (updateVal, id) => {
  loading.value = true
  error.value = null

  try {
    const updatedPayment = {
      userId: authStore.user.userId,
      ...updateVal
    }
    const response = await api.put(`/Balance/${id}`, updatedPayment)
    console.log("수정된 데이터----",response.data);


    const index = paymentList.value.findIndex(item => item.id == id)
    if (index !== -1) {
      paymentList.value[index] = {
        ...paymentList.value[index],
        ...response.data
      }
    }
  } catch (err) {
    console.log('수정에 실패했습니다', err)
  } finally {
    loading.value = false
  }
}
  return {
    loading,
    error,
    paymentList,
    categoryList,
    findPayment,
    viewDate,
    currentMonth,
    currentYear,
    summaryItems,
    incomeTotal,
    expenseTotal,
    totalBalance,
    getcategoryList,
    createPayment,
    fetchPayments,
    getPaymentsByMonth,
    searchPayment,
    isIncome,
    setViewDate,
    updatePayment
  }
})
