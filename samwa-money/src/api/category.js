import api from '@/utils/axios'

// ✅ 카테고리 불러오기
const fetchCategory = async () => {
  try {
    const response = await api.get('/Category')
    console.log('카테고리 가져오기 성공')
    return response.data
  } catch (error) {
    console.error('카테고리 가져오기 실패:', error.response?.data || error.message)
    throw error
  }
}

// ✅ 결제 정보 등록하기
const postPayment = async (paymentData) => {
  try {
    const response = await api.post('/Balance', paymentData)
    console.log('결제 등록 성공')
    return response.data
  } catch (error) {
    console.error('결제 등록 실패:', error.response?.data || error.message)
    throw error
  }
}

// ✅ 결제 목록 불러오기 (userId에 따라서)
const fetchPaymentsById = async (userId) => {
  try {
    const response = await api.get(`/Balance?userId=${userId}`)
    console.log('결제 목록 불러오기 성공')
    return response.data
  } catch (error) {
    console.error('결제 목록 불러오기 실패:', error.response?.data || error.message)
    throw error
  }
}

export { fetchCategory, postPayment, fetchPaymentsById }
