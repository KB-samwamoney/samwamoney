<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import SiteInfo from '@/components/auth/SiteInfo.vue'
</script>

<template>
  <div class="auth">
    <SiteInfo />
    <LoginForm />
  </div>
</template>

<style scoped>
.auth {
  display: flex;
  flex-direction: row;
}
</style>
