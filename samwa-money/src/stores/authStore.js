import { ref } from 'vue'
import { defineStore } from 'pinia'
import { registerUser, loginUser } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  // 유저 관련 정보
  const user = ref(JSON.parse(sessionStorage.getItem('user')) || null)
  // 로그인 여부 확인
  const isLoggedIn = ref(!!user.value)
  // 에러 메시지 할당
  const errorMessage = ref('')

  // ✅ 로그인
  const login = async (credentials) => {
    try {
      const loggedInUser = await loginUser(credentials)
      user.value = loggedInUser
      isLoggedIn.value = true
      errorMessage.value = ''
      sessionStorage.setItem('user', JSON.stringify(loggedInUser))
    } catch (error) {
      errorMessage.value = error.message
      isLoggedIn.value = false
    }
  }

  // ✅ 로그아웃
  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    errorMessage.value = ''
    sessionStorage.removeItem('user')
  }

  // ✅ 회원가입
  const register = async (newUser) => {
    try {
      const createdUser = await registerUser(newUser)
      user.value = createdUser
      isLoggedIn.value = true
      errorMessage.value = ''
      sessionStorage.setItem('user', JSON.stringify(createdUser))
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  return {
    user,
    isLoggedIn,
    errorMessage,
    login,
    logout,
    register,
  }
})
