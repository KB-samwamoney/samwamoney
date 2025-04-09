import { ref } from 'vue'
import { defineStore } from 'pinia'
import { registerUser, loginUser, findPassword, changeUserInfo, deleteUser } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  // 유저 관련 정보
  const user = ref(JSON.parse(sessionStorage.getItem('user')) || null)
  // 로그인 여부 확인
  const isLoggedIn = ref(!!user.value)
  // 에러 메시지 할당
  const errorMessage = ref('')

  // 비밀번호 확인
  const foundedpassword = ref('')

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

  // ✅ 비밀번호 찾기
  const passwordCheck = async ({ name, userId }) => {
    try {
      const checkPassword = await findPassword({ name, userId })
      foundedpassword.value = checkPassword
      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  // ✅ 회원정보 수정
  const updateUserInfo = async (updatedUser) => {
    try {
      const res = await changeUserInfo(updatedUser)
      user.value = res
      sessionStorage.setItem('user', JSON.stringify(res))
      errorMessage.value = ''
      return true
    } catch (error) {
      errorMessage.value = error.message
      return false
    }
  }

  // ✅ 회원탈퇴
  const withdraw = async () => {
    try {
      if (!user.value || !user.value.id) throw new Error('로그인된 사용자 정보가 없습니다.')
      await deleteUser(user.value.id)
      // 세션과 상태 초기화
      logout()
    } catch (error) {
      errorMessage.value = error.message
    }
  }

  return {
    user,
    isLoggedIn,
    errorMessage,
    foundedpassword,
    login,
    logout,
    register,
    withdraw,
    passwordCheck,
    updateUserInfo,
  }
})
