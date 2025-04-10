import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth.vue'),
    },
    {
      path: '/my-page',
      name: 'my-page',
      component: () => import('@/views/MyPage.vue'),
    },
    {
      path: '/good-bye',
      name: 'good-bye',
      component: () => import('@/views/GoodBye.vue'),
    },
    {
      path: '/profile-edit',
      name: 'profile-edit',
      component: () => import('@/views/ProfileEdit.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SignIn.vue'),
    },
    {
      path: '/password-search',
      name: 'password-search',
      component: () => import('@/views/PasswordSearch.vue'),
    },
    {
      path: '/payment-add',
      name: 'payment-add',
      component: () => import('@/views/PaymentAdd.vue'),
    },
    {
      path: '/payment-summary',
      name: 'payment-summary',
      component: () => import('@/views/PaymentSummary.vue'),
    },
    {
      path: '/payment-detail',
      name: 'payment-detail',
      component: () => import('@/views/PaymentDetail.vue'),
    },
    {
      path: '/payment-update',
      name: 'payment-update',
      component: () => import('@/views/PaymentUpdate.vue'),
    },
    {
      path: '/daily-payment',
      name: 'daily-payment',
      component: () => import('@/views/DailyPayment.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting.vue'),
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/Terms.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/Privacy.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isLoggedIn

  const guestOnlyRoutes = ['/sign-in', '/auth', '/password-search']

  if (!isLoggedIn && !guestOnlyRoutes.includes(to.path)) {
    alert('로그인하세요.')
    next('/auth')
  } else if (isLoggedIn && guestOnlyRoutes.includes(to.path)) {
    alert('이미 로그인 되었습니다.')
    next('/')
  } else {
    next()
  }
})

export default router
