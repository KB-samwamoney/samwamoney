import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/Auth.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/MainPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/my-page',
      name: 'my-page',
      component: () => import('@/views/MyPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/good-bye',
      name: 'good-bye',
      component: () => import('@/views/GoodBye.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile-edit',
      name: 'profile-edit',
      component: () => import('@/views/ProfileEdit.vue'),
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
    },
    {
      path: '/payment-summary',
      name: 'payment-summary',
      component: () => import('@/views/PaymentSummary.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/payment-detail/:id',
      name: 'payment-detail',
      component: () => import('@/views/PaymentDetail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/payment-update/:id',
      name: 'payment-update',
      component: () => import('@/views/PaymentUpdate.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/daily-payment',
      name: 'daily-payment',
      component: () => import('@/views/DailyPayment.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/SettingView.vue'),
      meta: { requiresAuth: true },
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

  const guestOnlyRoutes = ['/', '/sign-in', '/password-search']

  if (to.meta.requiresAuth && !isLoggedIn) {
    // 로그인 필요하지만 안 한 경우
    next('/sign-in')
  } else if (isLoggedIn && guestOnlyRoutes.includes(to.path)) {
    // 로그인 했는데 다시 로그인/비번찾기/회원가입 가려고 할 때
    next('/main')
  } else {
    next()
  }
})

export default router
