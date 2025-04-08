import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
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

export default router
