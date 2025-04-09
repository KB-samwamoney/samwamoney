import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import summary from '@/api/summary'

export const useSummaryStore = defineStore('summary', () => {
  // 수입, 지출 버튼을 위한 변수
  const currentTab = ref('수입')
  // 모든 카테고리 목록을 저장할 배열
  const currentCategory = ref([])
  // 현재 선택된 월(달) 값 - 오늘 날짜 기준
  const currentDate = ref(new Date())
  //
  //   const

  // 필요한 데이터: 날짜, 카테고리, 금액
  // 먼저 수입인지 지출인지 확인 -> 월 확인
  // -> 같은 카테고리끼리 묶어서 금액 모두 합산

  const filterBalance = () => {
    summary.getBalance(Month, type)
  }

  // 모든 카테고리 목록을 가져와 배열에 넣어줌
  const filterCategory = async () => {
    currentCategory.value = await summary.getCategory()
    console.log('currentCategory.value', currentCategory.value)
  }

  return { currentTab, currentCategory, filterBalance, filterCategory }
})
