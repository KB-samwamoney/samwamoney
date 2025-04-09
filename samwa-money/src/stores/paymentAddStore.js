import { ref} from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


const API_URL = 'http://localhost:5500'

export const usePaymentStore = defineStore('payment', () => {
  const loading = ref(false)
  const error = ref(null)

  const paymentList = ref([])
  const categoryList = ref([])

  const getcategoryList = async (paymentType) => {
    try {
      loading.value= true
      const response = await axios.get(`${API_URL}/Category`)
      categoryList.value = response.data.filter(list=> list.type === paymentType)
    } catch (error) {
      console.log(`카테고리 불러오기 실패${error}`);
    } finally {
      loading.value=false
    }
  }


  // const createPost = async (postData) => {
  //       loading.value = true
  //       error.value = null

  //       try {
  //           const newPost = {
  //               ...postData,
  //               createdAt: Date.now().toString(),
  //           }
  //           const response = await axios.post(API_URL, newPost)
  //           posts.value.push(response.data)
  //           return response.data
  //       } catch (error) {
  //           error.value = error.message || '게시물 등록애 실패했습니다'
  //           throw error
  //       } finally {
  //           loading.value = false
  //       }
  //   }


  return {loading, error ,paymentList, categoryList, getcategoryList,}
})
