import { defineStore } from 'pinia'
import { ref } from 'vue'
import summary from '@/api/summary'

export const useSummaryStore = defineStore('summary', () => {
  // 수입, 지출 버튼을 위한 변수
  const currentTab = ref('수입')
  // 모든 Balance 값을 저장할 배열
  const balanceList = ref([])
  // 모든 카테고리 목록을 저장할 배열
  const currentCategory = ref([])
  // 현재 선택된 월(달) 값 - 오늘 날짜 기준
  const currentDate = ref(new Date())

  // summer.js에서 모든 객체 리스트를 가져온다
  const filterBalance = async () => {
    balanceList.value = await summary.getBalance()
    // console.log('summaryStore.js: 18번째 balanceList', balanceList)
  }

  // 월을 반환해줌
  const getFormattedMonth = () => {
    return String(currentDate.value.getMonth() + 1).padStart(2, '0')
  }

  // 모든 카테고리 목록을 가져온 후 currentTab의 값과 일치하는 배열들을 필터링해줌
  const filterCategory = async () => {
    currentCategory.value = await summary.getCategory()
    currentCategory.value = currentCategory.value.filter((cat) =>
      currentTab.value === '수입' ? cat.type === 'income' : cat.type === 'expense',
    )
    // console.log('currentCategory 값을 잘 받아오는지 확인 ', currentCategory.value)
  }

  return {
    currentTab,
    balanceList,
    currentCategory,
    currentDate,
    getFormattedMonth,
    filterBalance,
    filterCategory,
  }
})
