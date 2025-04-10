import { ref, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { fetchSetting, updateSetting } from '@/api/setting.js'

export const useSettingStore = defineStore('setting', () => {
  const mode = ref('light')

  // API에서 설정값 가져오기
  const loadSetting = async () => {
    try {
      const settings = await fetchSetting()
      if (settings.length > 0) {
        mode.value = settings[0].mode
        applyTheme()
      }
    } catch (error) {
      console.error('설정값을 불러오는데 실패했습니다:', error)
    }
  }

  // 모드 변경 시 API와 로컬 스토리지 업데이트
  const saveMode = async (newMode) => {
    try {
      await updateSetting({ id: 1, mode: newMode })
      mode.value = newMode
      localStorage.setItem('mode', newMode)
    } catch (error) {
      console.error('모드 변경에 실패했습니다:', error)
    }
  }

  const applyTheme = () => {
    const root = document.documentElement
    if (mode.value === 'dark') {
      root.style.setProperty('--white', '#2C2C2E')
      root.style.setProperty('--light-white', '#121212') // 더 어두운 배경색
      root.style.setProperty('--baby-pink', '#2c2022') // 어두운 핑크 계열
      root.style.setProperty('--light-yellow', '#ffb300') // 어두워진 노란색
      root.style.setProperty('--lighter-yellow', '#121212') // 따뜻한 어두운 노란색
      root.style.setProperty('--real-yellow', '#f59e0b')
      root.style.setProperty('--blue', '#2979ca') // 어두운 파란색
      root.style.setProperty('--green', '#2a9d57') // 어두운 초록색
      root.style.setProperty('--brown', '#8b4f3d') // 어두운 갈색
      root.style.setProperty('--danger', '#cf3b3b') // 어두운 위험색
      root.style.setProperty('--light-gray', '#2d2d2d') // 어두운 밝은 회색
      root.style.setProperty('--dark-gray', '#555555') // 어두운 진한 회색
      root.style.setProperty('--black', '#ffffff') // 다크모드의 글자색
    } else {
      root.style.setProperty('--white', '#ffffff')
      root.style.setProperty('--light-white', '#fff9ef')
      root.style.setProperty('--baby-pink', '#ffeeee')
      root.style.setProperty('--light-yellow', '#ffe596')
      root.style.setProperty('--lighter-yellow', '#fef6d9')
      root.style.setProperty('--real-yellow', '#ffe066')
      root.style.setProperty('--blue', '#168eff')
      root.style.setProperty('--green', '#20a845')
      root.style.setProperty('--brown', '#c85a37')
      root.style.setProperty('--danger', '#ff1d1d')
      root.style.setProperty('--light-gray', '#f0f0f0')
      root.style.setProperty('--dark-gray', '#a7a7a7')
      root.style.setProperty('--black', '#050101')
    }
  }

  // 모드가 변경될 때마다 테마 적용
  watch(mode, (newMode) => {
    applyTheme(newMode)
  })

  // 컴포넌트 마운트 시 설정값 로드
  onMounted(() => {
    loadSetting()
  })

  return { mode, saveMode }
})
