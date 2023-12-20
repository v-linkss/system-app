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
        text: predio.predio_descricao,
        value: predio.predio_id,
      }));
    },
  },
});
