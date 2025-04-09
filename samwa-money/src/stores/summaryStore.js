import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import summary from '@/api/summary'

export const useSummaryStore = defineStore('summary', () => {
  // 수입, 지출 버튼을 위한 변수
  const currentTab = ref('수입')
  // 모든 Balance 값을 저장할 배열
  const balanceList = reactive([])
  // 모든 카테고리 목록을 저장할 배열
  const currentCategory = ref([])
  // 현재 선택된 월(달) 값 - 오늘 날짜 기준
  const currentDate = ref(new Date())
  //
  //   const

  // 필요한 데이터: 날짜, 카테고리, 금액
  // 먼저 수입인지 지출인지 확인 -> 월 확인
  // -> 같은 카테고리끼리 묶어서 금액 모두 합산

  const filterBalance = async () => {
    balanceList.value = await summary.getBalance()
    console.log('balanceList', balanceList)
  }

  const getFormattedMonth = () => {
    return String(currentDate.value.getMonth() + 1).padStart(2, '0')
  }

  // 모든 카테고리 목록을 가져와 배열에 넣어줌
  const filterCategory = async () => {
    currentCategory.value = await summary.getCategory()
    currentCategory.value = currentCategory.value.filter((cat) =>
      currentTab.value === '수입' ? cat.type === 'income' : cat.type === 'expense',
    )
    console.log('currentCategory 값을 잘 받아오는지 확인 ', currentCategory.value)
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
