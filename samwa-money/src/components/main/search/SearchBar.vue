<template>
  <div class="search-bar">
    <!-- 검색창 -->
    <div class="search-input-wrapper">
      <select class="search-select" v-model="searchType">
        <option value="search_title">제목</option>
        <option value="search_cash">금액</option>
        <option value="search_memo">메모</option>
      </select>
      <input :type="searchType === 'search_cash' ? 'number' : 'text'" v-model="searchKeyword" placeholder="검색어를 입력하세요."
        class="search-input" @keydown.enter="handleSearch" />

      <button class="search-btn" @click="handleSearch">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <!-- 카테고리 추가 -->
    <div class="search-category">
      <div class="add-cat">
        <select v-model="selectedCategoryToAdd" class="cat-select">
          <option disabled :value="null">카테고리 추가</option>
          <option v-for="cat in availableCategories" :key="cat.id" :value="cat">
            {{ cat.icon }} {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- 선택된 카테고리 버튼으로 표시 -->
      <div v-for="cat in categories" :key="cat.id" class="btn-cat" @click="handleCategoryClick(cat.name)">
        <div class="cat-label">{{ cat.icon }} {{ cat.name }}</div>
        <i class="fa-solid fa-xmark" @click.stop="removeCategory(cat.name)"></i>
      </div>

      <div class="btn-catAll">
        <div @click="removeAllCategory">전체 삭제</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'

const emit = defineEmits(['search', 'emit'])

const searchType = ref('search_title')
const searchKeyword = ref('')

const categories = ref([]) // 사용자가 선택한 카테고리 목록
const allCategoryOptions = ref([]) // 전체 카테고리
const selectedCategoryToAdd = ref(null) // 드롭다운에서 선택된 카테고리

// 컴포넌트가 마운트될 때 서버에서 카테고리 데이터 불러오기
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:5500/Category')
    allCategoryOptions.value = res.data
  } catch (error) {
    console.error('카테고리 불러오기 실패:', error)
  }
})

// 드롭다운에서 표시할 전체 카테고리 목록 (중복 제거 안 함)
const availableCategories = computed(() => allCategoryOptions.value)

// 드롭다운에서 새 카테고리 선택되면 버튼으로 추가 (중복 방지)
watch(selectedCategoryToAdd, (newVal) => {
  if (
    newVal &&
    !categories.value.some((cat) => cat.name === newVal.name) &&
    categories.value.length < 5
  ) {
    categories.value.push(newVal)

    emit('search', {
      type: searchType.value,
      keyword: searchKeyword.value,
      categories: categories.value.map((cat) => cat.name),
    })
  }

  selectedCategoryToAdd.value = null
})

// X 버튼 누르면 카테고리 제거
const removeCategory = (categoryName) => {
  categories.value = categories.value.filter((cat) => cat.name !== categoryName)

  if (categories.value.length === 0 && searchKeyword.value.trim() === '') {
    setTimeout(() => {
      emit('reset')
    }, 200)
    return
  }

  emit('search', {
    type: searchType.value,
    keyword: searchKeyword.value,
    categories: categories.value.map((cat) => cat.name),
  })
}

const removeAllCategory = () => {
  categories.value = []
  searchKeyword.value = ''

  emit('reset')
}

const handleSearch = () => {
  const selectedCategories = categories.value.map((cat) => cat.name)
  const isKeywordEmpty = searchKeyword.value.trim() === ''
  const isCategoryEmpty = selectedCategories.length === 0

  // 검색어도 없고, 카테고리도 선택 안 했으면 새로고침
  if (isKeywordEmpty && isCategoryEmpty) {
    window.location.reload()
    return
  }

  // 검색어 + 카테고리 모두 전달
  emit('search', {
    type: searchType.value,
    keyword: searchKeyword.value,
    categories: categories.value.map((cat) => cat.name),
  })
  // console.log(
  //   '[SearchBar.vue] emit search:',
  //   searchType.value,
  //   searchKeyword.value,
  //   selectedCategories,
  // )
}

const handleCategoryClick = (categoryName) => {
  const index = categories.value.findIndex((cat) => cat.name === categoryName)

  if (index !== -1) {
    categories.value.splice(index, 1)

    if (categories.value.length === 0 && searchKeyword.value.trim() === '') {
      setTimeout(() => {
        emit('reset')
      }, 200)
      return
    }
  } else {
    const catToAdd = allCategoryOptions.value.find((cat) => cat.name === categoryName)
    if (catToAdd) {
      categories.value.push(catToAdd)
    }
  }

  emit('search', {
    type: searchType.value,
    keyword: searchKeyword.value,
    categories: categories.value.map((cat) => cat.name),
  })
}
</script>

<style scoped src="@/assets/search.css"></style>
