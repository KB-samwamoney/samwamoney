import api from '@/utils/axios.js'
const fetchSetting = async () => {
  try {
    const response = await api.get('/Setting')
    console.log('모드 가져오기 성공')
    return response.data[0] // 첫 번째 설정 가져오기
  } catch (error) {
    console.error('모드 가져오기 실패:', error)
    throw error
  }
}

// ✅ PATCH로 수정하기 (id는 "1"로 고정 가정)
const updateSetting = async (newMode) => {
  try {
    const response = await api.patch('/Setting/1', {
      mode: newMode,
    })
    console.log('모드 변경하기 성공')
    return response.data
  } catch (error) {
    console.error('모드 변경 실패:', error)
    throw error
  }
}

export { fetchSetting, updateSetting }
