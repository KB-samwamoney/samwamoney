<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import SiteInfo from '@/components/auth/SiteInfo.vue'
</script>

<template>
  <div class="auth">
    <div class="site-info-wrapper">
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
}

.site-info-wrapper,
.login-form-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-wrapper {
  background-color: white;
}
</style>
