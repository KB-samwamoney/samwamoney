<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import SiteInfo from '@/components/auth/SiteInfo.vue'
</script>

<template>
  <div class="auth">
    <div class="site-info-wrapper">
      <!-- 배경 애니메이션 요소들 -->
      <div class="animated-background">
        <div class="coin coin-1">💰</div>
        <div class="coin coin-2">💵</div>
        <div class="coin coin-3">💸</div>
        <div class="coin coin-4">💲</div>
        <div class="coin coin-5">✨</div>
        <div class="coin coin-6">💰</div>
        <div class="coin coin-7">💵</div>

        <!-- 물결 효과 -->
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>

        <!-- 원형 그라데이션 효과 - 오직 노란색만 -->
        <div class="gradient-circle circle1"></div>
        <div class="gradient-circle circle2"></div>
      </div>

      <SiteInfo />
    </div>
    <div class="login-form-wrapper">
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  flex-direction: row;
  height: 80vh;
  position: relative;
  overflow: hidden;
}

.site-info-wrapper,
.login-form-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.site-info-wrapper {
  background: linear-gradient(260deg, white 0%, var(--lighter-yellow) 100%);
  overflow: hidden;
}

.login-form-wrapper {
  background-color: white;
}

/* 배경 애니메이션 스타일 */
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

/* 동전 애니메이션 - 위에서 떨어지는 효과로 변경 */
.coin {
  position: absolute;
  font-size: 24px;
  opacity: 0.5;
  animation-duration: 15s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: fall-down;
}

.coin-1 {
  left: 10%;
  top: -50px;
  animation-delay: 0s;
  animation-duration: 12s;
}

.coin-2 {
  left: 25%;
  top: -50px;
  animation-delay: 2s;
  animation-duration: 13s;
}

.coin-3 {
  left: 40%;
  top: -50px;
  animation-delay: 4s;
  animation-duration: 15s;
}

.coin-4 {
  left: 55%;
  top: -50px;
  animation-delay: 6s;
  animation-duration: 14s;
}

.coin-5 {
  left: 70%;
  top: -50px;
  animation-delay: 8s;
  animation-duration: 16s;
}

.coin-6 {
  left: 85%;
  top: -50px;
  animation-delay: 10s;
  animation-duration: 17s;
}

.coin-7 {
  left: 95%;
  top: -50px;
  animation-delay: 12s;
  animation-duration: 18s;
}

@keyframes fall-down {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(1000px) rotate(360deg);
    opacity: 0;
  }
}

/* 물결 애니메이션 - 노란색만 사용 */
.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: rgba(255, 236, 179, 0.15);
  border-radius: 50% 50% 0 0;
  animation: wave 10s linear infinite;
}

.wave1 {
  bottom: -70px;
  height: 80px;
  animation-duration: 10s;
}

.wave2 {
  bottom: -90px;
  height: 100px;
  animation-duration: 12s;
  animation-delay: 1s;
  opacity: 0.2;
  background: rgba(255, 224, 130, 0.15);
}

.wave3 {
  bottom: -110px;
  height: 120px;
  animation-duration: 14s;
  animation-delay: 2s;
  opacity: 0.15;
  background: rgba(255, 213, 79, 0.15);
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 원형 그라데이션 효과 - 오직 노란색 계열만 */
.gradient-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
  filter: blur(60px);
  animation: pulse 8s ease-in-out infinite alternate;
}

.circle1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #fff9c4, #ffee58);
  top: -50px;
  right: -50px;
  animation-delay: 0s;
}

.circle2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(45deg, #ffe082, #ffca28);
  bottom: -50px;
  left: -50px;
  animation-delay: 2s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.15;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.25;
  }
}
</style>
