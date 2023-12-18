// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: 'panel',
        name: 'panel',
        component: () => import('@/views/Areas/AreasHome.vue'),
      },
      {
        path: 'esqueci-senha',
        name: 'esqueci-senha',
        component: () => import('@/views/ForgetPassword.vue'),
      },
      {
        path: 'recupera-senha',
        name: 'recupera-senha',
        component: () => import('@/views/UpdatePassword.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
