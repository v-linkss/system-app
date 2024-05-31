// store.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    menu: null,
    predio:null,
    combo:null,
    relatorio:null,
    equipamento:null
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setPredio(state, predio) {
      state.predio = predio;
      localStorage.setItem("predio", JSON.stringify(predio));
    },
    setCombo(state, combo) {
      state.combo = combo;
      localStorage.setItem("combo", JSON.stringify(combo));
    },
    setMenu(state, menu) {
      state.menu = menu;
      localStorage.setItem("menu", JSON.stringify(menu));
    },
    setRelatorio(state, relatorio) {
      state.relatorio = relatorio;
      localStorage.setItem("relatorio", JSON.stringify(relatorio));
    },
    setEquipamento(state, equipamento) {
      state.equipamento = equipamento;
      localStorage.setItem("equipamento", JSON.stringify(equipamento));
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
        user_token:this.getters.user.token,
        predio_token:this.getters.prediosState.predio_token
      }
      try {
        const userData = JSON.parse(localStorage.getItem("user"))
        const headers = {
          Authorization: `Bearer ${userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/listarMenu`,
          data, {headers}
        );
        
        const responseData = response.data;
        commit("setMenu", responseData[0].func_menu[0].menu);
      } catch (error) {
        console.log(error);
      }
    },
    async listarEquipamento({ commit }) {
      const storedToken = JSON.parse(localStorage.getItem("predio"))
      const data = {
       predio_token:storedToken.predio_token
      }
      try {
        const userData = JSON.parse(localStorage.getItem("user"))
        const headers = {
          Authorization: `Bearer ${userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/listaEquipamentos`,
          data, {headers}
        );

        const responseData = response.data;
        commit("setEquipamento", responseData[0].func_json_equipamentos);
      } catch (error) {
        console.log(error);
      }
    },
    async listarRelatorios({ commit }) {
      const storedTokenUser = JSON.parse(localStorage.getItem("user"))
      const storedTokenPredio = JSON.parse(localStorage.getItem("predio"))
      const data = {
        user_token:storedTokenUser.token,
        predio_token:storedTokenPredio.predio_token
      }
      try {
        const userData = JSON.parse(localStorage.getItem("user"))

        const headers = {
          Authorization: `Bearer ${userData.token}`, // Add authorization header with Bearer token
        };

        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/relatorios_combolist`,
          data, {headers}
        );

        const responseData = response.data;
        commit("setRelatorio", responseData[0].func_json_relatorios_v2);
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
    relatorio(state) {
      return state.relatorio;
    },
    prediosState(state) {
      return state.predio;
    },
    equipamentos(state){
      return state.equipamento;
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

// colocar funcao de localStorage no combolist do appBar quando recarregar a pagina
