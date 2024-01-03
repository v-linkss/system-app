// store.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    menu: null,
    predio:null,
    combo:null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setMenu(state, menu) {
      state.menu = menu;
      localStorage.setItem("menu", JSON.stringify(menu));
    },
    setPredio(state, predio) {
      state.predio = predio;
      localStorage.setItem("predio", JSON.stringify(predio));
    },
    setCombo(state, combo) {
      state.combo = combo;
      localStorage.setItem("combo", JSON.stringify(combo));
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setPredio({ commit }, predio) {
      commit("setPredio", predio);
    },
    setCombo({ commit }, combo) {
      commit("setCombo", combo);
    },
    async listarMenu({ commit }) {
      const data = {
        user_token:this.getters.usuarios.user_token,
        predio_token:this.getters.prediosState
      }
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/listarMenu`,
          data
        );
        const responseData = response.data;
        console.log(response)
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
      const storedCombo = JSON.parse(localStorage.getItem("combo"));
      return storedCombo || state.user.predios.map((predio) => ({
        text: predio.predio_descricao,
        value: predio.predio_token,
      }));
    },
    usuarios(state) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      return storedUser || {
        nome: state.user.nome,
        user_token: state.user.token,
      };
    },
    menuSelect(state) {
      const storedMenu = JSON.parse(localStorage.getItem("menu"));
      return storedMenu || {
        cadastros: state.menu.Cadastros,
        financeiro: state.menu.Financeiro,
        relatorios: state.menu.Relatórios,
      };
    },
  },
});
