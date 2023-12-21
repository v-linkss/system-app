// store.js
import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
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
        token: state.user.token,
        predio_token: state.user.predios.predio_token
      };
   },
  },
});
