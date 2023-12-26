// store.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    menu: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setMenu(state, menu) {
      state.menu = menu;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    async listarMenu({ commit, getters }) {
      try {
        const response = await axios.post(
          "http://localhost:3200/listarMenu",
          getters.usuarios
        );
        const responseData = response.data;
        console.log("dados", responseData[0].func_menu[0]);
        commit("setMenu", responseData[0].func_menu[0].menu);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    menu(state) {
      return state.menu;
    },
    predios(state) {
      return state.user.predios.map((predio) => ({
        token: predio.predio_token,
        text: predio.predio_descricao,
        value: predio.predio_id,
      }));
    },
    usuarios(state) {
      return {
        nome: state.user.nome,
        user_token: state.user.token,
        predio_token: state.user.predios[0].predio_token,
      };
    },
    menuSelect(state) {
      return {
        cadastros: state.menu.Cadastros,
        financeiro: state.menu.Financeiro,
        relatorios: state.menu.Relatórios,
      };
    },
  },
});
