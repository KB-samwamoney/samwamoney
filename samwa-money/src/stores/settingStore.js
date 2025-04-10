import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const mode = ref('light')

  const applyTheme = () => {
    const root = document.documentElement
    if (mode.value === 'dark') {
      root.style.setProperty('--light-white', '#121212') // 더 어두운 배경색
      root.style.setProperty('--baby-pink', '#2c2022') // 어두운 핑크 계열
      root.style.setProperty('--light-yellow', '#ffb300') // 어두워진 노란색
      root.style.setProperty('--blue', '#2979ca') // 어두운 파란색
      root.style.setProperty('--green', '#2a9d57') // 어두운 초록색
      root.style.setProperty('--brown', '#8b4f3d') // 어두운 갈색
      root.style.setProperty('--danger', '#cf3b3b') // 어두운 위험색
      root.style.setProperty('--light-gray', '#2d2d2d') // 어두운 밝은 회색
      root.style.setProperty('--dark-gray', '#555555') // 어두운 진한 회색
      root.style.setProperty('--black', '#ffffff') // 다크모드의 글자색
    } else {
      root.style.setProperty('--light-white', '#fff9ef')
      root.style.setProperty('--baby-pink', '#ffeeee')
      root.style.setProperty('--light-yellow', '#ffe596')
      root.style.setProperty('--blue', '#168eff')
      root.style.setProperty('--green', '#20a845')
      root.style.setProperty('--brown', '#c85a37')
      root.style.setProperty('--danger', '#ff1d1d')
      root.style.setProperty('--light-gray', '#f0f0f0')
      root.style.setProperty('--dark-gray', '#a7a7a7')
      root.style.setProperty('--black', '#050101')
    }
  }

  // 모드가 바뀔 때 자동 반영되게
  watch(mode, applyTheme, { immediate: true })

  return { mode, applyTheme }
})
