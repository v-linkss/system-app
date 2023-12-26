// store.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    menu: null
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
    async listarMenu({commit,getters }) {
      try {
        const response = await axios.post("http://localhost:3200/listarMenu", getters.usuarios);
        commit('setMenu', response.data);
      } catch (error) {
        console.log(error);
      }
   },
  },
  getters: {
    user(state) {
      return state.user;
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
        name: state.user.nome,
        user_token: state.user.token,
        predio_token: state.user.predios[0].predio_token,
      };
   },
   menu(state) {
    return {
      cadastros: state.menu.cadastros,
      financeiro: state.menu.financeiro,
      relatorios: state.user.predios[0].predio_token,
    };
  },
  },
});
