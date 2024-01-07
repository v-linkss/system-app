// Composables
import { createRouter, createWebHistory } from 'vue-router'
import store from '../stores/store';

const routes = [
  {
    path: "/",
    redirect: { path: "login" }, // redirect property
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/Acesso/Login.vue'),
      },
      {
        path: 'selecao-predio',
        name: 'selecao-predio',
        component: () => import('@/views/Acesso/ClientSelect.vue'),
      },
      {
        path: 'panel',
        name: 'panel',
        component: () => import('@/views/Acesso/Panel.vue'),
      },
      {
        path: 'esqueci-senha',
        name: 'esqueci-senha',
        component: () => import('@/views/Acesso/ForgetPassword.vue'),
      },
      {
        path: 'recupera-senha',
        name: 'recupera-senha',
        component: () => import('@/views/Acesso/UpdatePassword.vue'),
      },
      //equipamentos-tipos
      {
        path: '/equipamentos-tipos/index',
        name: '/equipamentos-tipos/index',
        component: () => import('@/views/TiposEquipamentos/TableTypesTools.vue'),
      },
      //ambientes
      {
        path: '/predios-ambientes/index',
        name: '/predios-ambientes/index',
        component: () => import('@/views/Ambientes/AmbientesHome.vue'),
      },
      {
        path: 'predios-ambientes/index/cadastro',
        name: 'predios-ambientes/index/cadastro',
        component: () => import('@/views/Ambientes/AmbientesRegister.vue'),
      },
      {
        path: 'predios-ambientes/index/alterar',
        name: 'predios-ambientes/index/alterar',
        component: () => import('@/views/Ambientes/AmbientesUpdate.vue'),
      },
      {
        path: 'predios-ambientes/index/vizualizar',
        name: 'predios-ambientes/index/vizualizar',
        component: () => import('@/views/Ambientes/AmbientesView.vue'),
      },
      //predios-equipamentos
      {
        path: 'predios-equipamentos/index',
        name: 'predios-equipamentos/index',
        component: () => import('@/views/TiposEquipamentos/TableTypesTools.vue'),
      },
    ],
  },
]

// {
//   path: "/",
//   redirect: { path: "/login" }, // redirect property
//   component: () => import('@/layouts/default/Default.vue'),
//   children: [
//     {path:"/login",
//     name:"Login",
//     component: () => import('@/views/Login.vue')},
//     //Areas
//     {
//       path: '/home',
//       name: 'Home',
//       component: () => import('@/views/PrediosAmbientes/AreasHome.vue'),
//     },
//     {
//       path: 'register',
//       name: 'Register',
//       component: () => import( '@/views/PrediosAmbientes/AreasRegister.vue'),
//     },
//     {
//       path: 'update',
//       name: 'Update',
//       component: () => import( '@/views/PrediosAmbientes/AreasUpdate.vue'),
//     },
//     {
//       path: 'view',
//       name: 'View',
//       component: () => import( '@/views/PrediosAmbientes/AreasView.vue'),
//     },
//   ]
// }
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
