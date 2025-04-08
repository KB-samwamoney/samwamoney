import api from '@/utils/axios'

const fetchCategory = async () => {
  try {
    const response = await api.get('/Category')
    console.log('카테고리 가져오기 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('카테고리 가져오기 실패:', error.response?.data || error.message)
    throw error
  }
}

export { fetchCategory }
