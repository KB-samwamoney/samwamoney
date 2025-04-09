import axios from '@/utils/axios'

// 회원가입
const registerUser = async (userData) => {
  try {
    const response = await axios.post('/Auth', userData)
    console.log('회원가입 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error.response?.data || error.message)
    throw error
  }
}

// 로그인
const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/Auth', credentials)
    console.log('로그인 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('로그인 실패:', error.response?.data || error.message)
    throw error
  }
}

export { registerUser, loginUser }
