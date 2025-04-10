<script setup>
import { ref, onMounted } from 'vue';
import textImg from '@/assets/img/삼와머니.png'
import KidneyImg from '@/assets/img/콩팥이.png'

// 타이핑 효과를 위한 텍스트 설정
const fullText = "💰 너... 지갑 아직 살아있어? 💰";
const displayText = ref("");
const isTypingComplete = ref(false);

// 타이핑 효과 구현
onMounted(() => {
  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < fullText.length) {
      displayText.value += fullText.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
      isTypingComplete.value = true;
    }
  }, 100);
});
</script>

<template>
  <div class="site-info">
    <img :src="KidneyImg" alt="콩팥" class="kidney animated-kidney" />
    <img :src="textImg" alt="삼와머니" class="text animated-logo" />
    <p class="wallet-text">{{ displayText }}</p>
    <p class="caption" :class="{ 'fade-in': isTypingComplete }">
      콩팥이가 지켜주는 간편한 가계부,
      <img :src="textImg" alt="삼와머니" class="text-img pulse" />!
    </p>
  </div>
</template>

<style scoped>
.site-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.kidney {
  width: 25%;
}

.text {
  width: 35%;
  margin-bottom: var(--space-l);
}

.caption {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  flex-wrap: wrap;
  opacity: 0;
  transition: opacity 1s ease-in;
}

.caption.fade-in {
  opacity: 1;
}

.text-img {
  width: 12%;
  display: inline;
}

/* 콩팥이 애니메이션 */
.animated-kidney {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 로고 애니메이션 */
.animated-logo {
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* 작은 로고 애니메이션 */
.pulse {
  animation: smallPulse 2s infinite;
}

@keyframes smallPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* 지갑 텍스트 스타일 */
.wallet-text {
  min-height: 1.5em;
}
</style>
