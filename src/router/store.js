// store.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    menu: null,
    predio:null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setMenu(state, menu) {
      state.menu = menu;
    },
    setPredio(state, predio) {
      state.predio = predio;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setPredio({ commit }, predio) {
      commit("setPredio", predio);
    },
    async listarMenu({ commit }) {
      const data = {
        user_token:this.getters.usuarios.user_token,
        predio_token:this.getters.prediosState
      }
      try {
        const response = await axios.post(
          "http://localhost:3200/listarMenu",
          data
        );
        const responseData = response.data;
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
    prediosState(state) {
      return state.predio;
    },
    predios(state) {
      return state.user.predios.map((predio) => ({
        text: predio.predio_descricao,
        value: predio.predio_token,
      }));
    },
    usuarios(state) {
      return {
        nome: state.user.nome,
        user_token: state.user.token,
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
