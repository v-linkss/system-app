// store.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    menu: null,
    predioState:null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setMenu(state, menu) {
      state.menu = menu;
    },
    setPredio(state, predioState) {
      state.predioState = predioState;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    async listarMenu({ commit }) {
      const data = {
        user_token:this.getters.usuarios.user_token,
        predio_token:this.getters.prediosState[0].predio_token
      }
      try {
        const response = await axios.post(
          "http://localhost:3200/listarMenu",
          data
        );
        const responseData = response.data;
        console.log("dados", data);
        commit("setMenu", responseData[0].func_menu[0].menu);
        console.log("dados", responseData[0].func_menu[0].menu);
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
      return state.predioState;
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
