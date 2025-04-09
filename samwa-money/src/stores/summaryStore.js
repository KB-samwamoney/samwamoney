import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:5000/balance'

export const useSummaryStore = defineStore('summary', () => {
  const currentTab = ref('수입')

  return { currentTab }
})
