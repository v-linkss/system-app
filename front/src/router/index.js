// Composables
import { createRouter, createWebHistory } from 'vue-router'
import store from './store';

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
        path: 'selecao-predio',
        name: 'selecao-predio',
        component: () => import('@/views/ClientSelect.vue'),
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

router.beforeEach((to, from, next) => {
  // Verificar se a rota requer dados do usuário e se o usuário está autenticado
  if (to.meta.requiresUser && !store.state.user) {
    next('login'); // Ou redirecione para a página de login
  } else {
    next();
  }
});

export default router
