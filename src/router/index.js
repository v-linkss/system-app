// Composables
import { createRouter, createWebHistory } from "vue-router";
import store from "../stores/store";

const routes = [
  {
    path: "/",
    redirect: { path: "login" }, // redirect property
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      //Acesso
      {
        path: "login",
        name: "login",
        component: () => import("@/views/Acesso/Login.vue"),
      },
      {
        path: "selecao-predio",
        name: "selecao-predio",
        component: () => import("@/views/Acesso/ClientSelect.vue"),
      },
      {
        path: "panel/index",
        name: "panel/index",
        component: () => import("@/views/Acesso/Panel.vue"),
      },
      {
        path: "esqueci-senha",
        name: "esqueci-senha",
        component: () => import("@/views/Acesso/ForgetPassword.vue"),
      },
      {
        path: "recupera-senha",
        name: "recupera-senha",
        component: () => import("@/views/Acesso/UpdatePassword.vue"),
      },
      //equipamentos-tipos
      {
        path: "equipamentos-tipos/index",
        name: "equipamentos-tipos/index",
        component: () =>
          import("@/views/TiposEquipamentos/TableTypesTools.vue"),
      },
      {
        path: "equipamentos-tipos/index/cadastro",
        name: "equipamentos-tipos/index/cadastro",
        component: () =>
          import("@/views/TiposEquipamentos/RegisterTypesTools.vue"),
      },
      {
        path: "equipamentos-tipos/index/atualizar",
        name: "equipamentos-tipos/index/atualizar",
        component: () =>
          import("@/views/TiposEquipamentos/UpdateTypesTools.vue"),
      },
      {
        path: "equipamentos-tipos/index/vizualizar",
        name: "equipamentos-tipos/index/vizualizar",
        component: () => import("@/views/TiposEquipamentos/ViewTypesTools.vue"),
      },
      //ambientes
      {
        path: "/predios-ambientes/index",
        name: "/predios-ambientes/index",
        component: () => import("@/views/Ambientes/AmbientesHome.vue"),
      },
      {
        path: "predios-ambientes/index/cadastro",
        name: "predios-ambientes/index/cadastro",
        component: () => import("@/views/Ambientes/AmbientesRegister.vue"),
      },
      {
        path: "predios-ambientes/index/alterar",
        name: "predios-ambientes/index/alterar",
        component: () => import("@/views/Ambientes/AmbientesUpdate.vue"),
      },
      {
        path: "predios-ambientes/index/vizualizar",
        name: "predios-ambientes/index/vizualizar",
        component: () => import("@/views/Ambientes/AmbientesView.vue"),
      },
      //predios-equipamentos
      {
        path: "predios-equipamentos/index",
        name: "predios-equipamentos/index",
        component: () => import("@/views/PrediosEquipamento/TableTools.vue"),
      },
      {
        path: "predios-equipamentos/index/cadastro",
        name: "predios-equipamentos/index/cadastro",
        component: () =>
          import("@/views/PrediosEquipamento/RegisterTableTools.vue"),
      },
      {
        path: "predios-equipamentos/index/atualizar",
        name: "predios-equipamentos/index/atualizar",
        component: () =>
          import("@/views/PrediosEquipamento/UpdateTableTools.vue"),
      },
      {
        path: "predios-equipamentos/index/vizualizar",
        name: "predios-equipamentos/index/vizualizar",
        component: () =>
          import("@/views/PrediosEquipamento/ViewTableTools.vue"),
      },
      //Modelos
      {
        path: "equipamentos-modelos/index",
        name: "equipamentos-modelos/index",
        component: () => import("@/views/EquipamentosModelo/TableModelo.vue"),
      },
      {
        path: "equipamentos-modelos/index/cadastro",
        name: "equipamentos-modelos/index/cadastro",
        component: () =>
          import("@/views/EquipamentosModelo/RegisterModelo.vue"),
      },
      {
        path: "equipamentos-modelos/index/atualizar",
        name: "equipamentos-modelos/index/atualizar",
        component: () => import("@/views/EquipamentosModelo/UpdateModelo.vue"),
      },
      {
        path: "equipamentos-modelos/index/vizualizar",
        name: "equipamentos-modelos/index/vizualizar",
        component: () => import("@/views/EquipamentosModelo/ViewModelo.vue"),
      },
      //Relatorios
      {
        path: "relatorios/index",
        name: "relatorios/index",
        component: () => import("@/views/Relatorios/Relatorios.vue"),
      },
      //Lotes
      {
        path: "pi-lotes-receitas/index",
        name: "pi-lotes-receitas/index",
        component: () => import("@/views/Lotes/LotesTable.vue"),
      },
      {
        path: "pi-lotes-receitas/index/cadastro",
        name: "pi-lotes-receitas/index/cadastro",
        component: () => import("@/views/Lotes/LotesRegister.vue"),
      },
      {
        path: "pi-lotes-receitas/index/atualizar",
        name: "pi-lotes-receitas/index/atualizar",
        component: () => import("@/views/Lotes/LotesUpdate.vue"),
      },
      {
        path: "pi-lotes-receitas/index/vizualizar",
        name: "pi-lotes-receitas/index/vizualizar",
        component: () => import("@/views/Lotes/LotesView.vue"),
      },
      //Gerar-titulos
      {
        path: "gestao-perimetros/titulos",
        name: "gestao-perimetros/titulos",
        component: () => import("@/views/GerarTitulos/GerarTitulosHome.vue"),
      },
      //Titulos-receber
      {
        path: "gestao-perimetros/index",
        name: "gestao-perimetros/index",
        component: () =>
          import("@/views/TitulosAReceber/TitulosAReceberHome.vue"),
      },
      {
        path: "titulos-receber/prorroga",
        name: "titulos-receber/prorroga",
        component: () =>
          import("@/views/TitulosAReceber/TitulosProrrogacao.vue"),
      },
      {
        path: "titulos-receber/liquida",
        name: "titulos-receber/liquida",
        component: () =>
          import("@/views/TitulosAReceber/TitulosLiquida.vue"),
      },
      {
        path: "titulos-receber/cancela",
        name: "titulos-receber/cancela",
        component: () =>
          import("@/views/TitulosAReceber/TitulosCancelamento.vue"),
      },
      {
        path: "titulos-receber/recibo",
        name: "titulos-receber/recibo",
        component: () =>
          import("@/views/TitulosAReceber/TitulosAReceberHome.vue"),
      },
      //Lancamentos
      {
        path: "pi-lancamentos/index",
        name: "pi-lancamentos/index",
        component: () =>
          import("@/views/Lancamentos/TableLancamentos.vue"),
      },
      {
        path: "pi-lancamentos/index/cadastro",
        name: "pi-lancamentos/index/cadastro",
        component: () =>
          import("@/views/Lancamentos/RegisterLancamentos.vue"),
      },
      {
        path: "pi-lancamentos/index/atualizar",
        name: "pi-lancamentos/index/atualizar",
        component: () =>
          import("@/views/Lancamentos/UpdateLancamentos.vue"),
      },
      {
        path: "pi-lancamentos/index/vizualizar",
        name: "pi-lancamentos/index/vizualizar",
        component: () =>
          import("@/views/Lancamentos/ViewLancamentos.vue"),
      },
      //Lancamentos-informacoes
      {
        path: "pi-lancamentos-informacoes/index",
        name: "pi-lancamentos-informacoes/index",
        component: () =>
          import("@/views/LancamentosInformacao/TableLancamentosInformacao.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Verificar se a rota requer dados do usuário e se o usuário está autenticado
  if (to.meta.requiresUser && !store.state.user) {
    next("login"); // Ou redirecione para a página de login
  } else {
    next();
  }
});

export default router;
