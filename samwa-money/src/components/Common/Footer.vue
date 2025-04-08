<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div class="footer-info">
      <p><strong>프로젝트명:</strong> 삼와머니</p>
      <p><strong>대표자명:</strong> 임예원</p>
      <p><strong>사업자등록번호:</strong> 123-45-67890</p>
      <p><strong>주소:</strong> 서울특별시 광진구 능동로 195-16</p>
      <p>
        <strong>사이트 주소:</strong>
        <a href="https://github.com/KB-samwamoney/samwamoney" target="_blank" rel="noopener">
          https://github.com/KB-samwamoney/samwamoney
        </a>
      </p>
    </div>
    <div class="footer-links">
      <RouterLink to="/terms">서비스 이용 약관</RouterLink>
      <span>|</span>
      <RouterLink to="/privacy">개인정보처리방침</RouterLink>
    </div>
    <div class="footer-copy">
      <p>© 2025 삼와머니. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1rem;
  background-color: var(--light-yellow);
  font-size: 0.8rem;
  color: #555;
  text-align: center;
}

.footer-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 0.8rem;
  font-size: 0.75rem;
  line-height: 1.4;
}

.footer-info p {
  margin: 0;
  white-space: nowrap;
}

.footer-info a {
  color: #007acc;
  text-decoration: none;
}

.footer-links {
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
}

.footer-links a {
  color: #007acc;
  text-decoration: none;
  margin: 0 0.5rem;
}

.footer-links span {
  margin: 0 0.3rem;
  color: #aaa;
}

.footer-copy {
  font-size: 0.7rem;
  color: #888;
}
</style>
