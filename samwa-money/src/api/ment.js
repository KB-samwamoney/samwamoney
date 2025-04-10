import api from '@/utils/axios.js'

const fetchMents = async () => {
  try {
    const response = await api.get('/Ment')
    console.log('멘트 가져오기 성공')
    return response.data
  } catch (error) {
    throw error
  }
}

export { fetchMents }
