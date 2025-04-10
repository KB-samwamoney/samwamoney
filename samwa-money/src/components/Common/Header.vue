<script setup>
import LogoImg from '@/assets/img/삼와머니-로고.png'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ref, onMounted, onUnmounted } from 'vue'

const router = useRouter()
const authStore = useAuthStore()

const goToHome = () => {
  router.push('/main')
}

const goToLogin = () => {
  router.push('/main')
}

const goToSignup = () => {
  router.push('/sign-in')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/main')
}

// 눈 움직임 관련 로직
const eyes = ref([])
const header = ref(null)

const handleMouseMove = (e) => {
  eyes.value.forEach((eye) => {
    const eyeRect = eye.getBoundingClientRect()
    const eyeCenterX = eyeRect.left + eyeRect.width / 2
    const eyeCenterY = eyeRect.top + eyeRect.height / 2

    // 마우스와 눈 중심 사이의 각도 계산
    const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)

    // 눈 안에서 눈알이 움직일 수 있는 최대 거리 (눈 크기의 30%)
    const maxDistance = eyeRect.width * 0.3

    // 눈알의 새 위치 계산
    const pupilX = Math.cos(angle) * maxDistance
    const pupilY = Math.sin(angle) * maxDistance

    // 눈 안의 pupil 요소 선택
    const pupil = eye.querySelector('.pupil')
    if (pupil) {
      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`
    }
  })
}

onMounted(() => {
  eyes.value = Array.from(document.querySelectorAll('.eye'))
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="header">
    <img :src="LogoImg" alt="로고" @click="goToHome" />
    <div class="eyes">
      <div class="eye">
        <div class="pupil"></div>
      </div>
      <div class="eye">
        <div class="pupil"></div>
      </div>
    </div>
    <div class="nav-buttons">
      <template v-if="!authStore.isLoggedIn">
        <button @click="goToLogin">로그인</button>
        <button @click="goToSignup">회원가입</button>
      </template>
      <template v-else>
        <button @click="handleLogout">로그아웃</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: var(--light-yellow);
  display: flex;
  padding: 0 var(--space-l);
  justify-content: space-between;
  align-items: center;
}

img {
  width: 125px;
  cursor: pointer;
}

.eyes {
  display: flex;
  justify-content: space-between;
  gap: var(--space-l);
}

.eye {
  width: 40px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: blink 4s infinite;
  border: 2px solid #aaa;
  overflow: hidden; /* 눈알이 눈 밖으로 나가지 않도록 */
}

.pupil {
  width: 20px;
  height: 25px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  transition: transform 0.1s ease-out; /* 부드러운 움직임을 위한 transition */
}

@keyframes blink {
  0%,
  96%,
  100% {
    transform: scaleY(1);
  }
  98% {
    transform: scaleY(0.1);
  }
}

.nav-buttons {
  display: flex;
  gap: var(--space-s);
}

button {
  background-color: var(--light-white);
  border: 1px solid var(--light-yellow);
  border-radius: var(--radius);
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Pretendard';
  color: var(--black);
}
</style>
