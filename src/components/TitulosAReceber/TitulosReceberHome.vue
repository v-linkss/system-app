<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <div>
    <AppBar />
    <v-row class="mt-6" no-gutters>
      <v-col>
        <v-text-field
          class="ml-6"
          v-model="titulos.dt_vencimento_inicio"
          type="date"
          label="Data de vencimento inicio"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          class="ml-6"
          v-model="titulos.dt_vencimento_fim"
          type="date"
          label="Data de vencimento Fim"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          class="ml-6"
          v-model="titulos.dt_emissao_inicio"
          type="date"
          label="Data de emissão inicio"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          class="ml-6"
          v-model="titulos.dt_emissao_fim"
          type="date"
          label="Data de emissão fim"
        ></v-text-field>
      </v-col>
      <v-btn
        class="me-4 ml-4"
        style="height: 40px"
        color="green"
        @click="gerarTitulos()"
      >
        Pesquisar
      </v-btn>
    </v-row>

    <v-col>
      <v-autocomplete
        v-model="selectedItem"
        :items="lotesCombo"
        label="Selecione um lote"
        item-title="nome"
        item-value="token"
      ></v-autocomplete>
    </v-col>
    <v-data-table
      :headers="headers"
      :search="searchQuery"
      :items="displayedItems"
      :rows-per-page-items="itemsPerPage"
      :footer-props="footerProps"
      density="default"
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <template v-for="(header, headerIndex) in headers" :key="headerIndex">
            <td>
              <template
                v-if="index === 0 && headerIndex !== headers.length - 1"
              >
                <v-text-field
                  v-model="header.search"
                  outlined
                  hide-details
                  @keydown.enter="filterOnEnter"
                  @blur="filterOnBlur"
                  ref="searchFields"
                  style="
                    width: 100%;
                    background-color: #ffffff;
                    border: 1px solid #cccccc;
                    border-radius: 5px;
                  "
                  :class="{ focused: isFocused }"
                ></v-text-field>
              </template>
              <template v-else-if="headerIndex !== headers.length - 1">
                {{ item[header.value] }}
              </template>
              <template v-else>
                <div
                  v-if="index !== 0 && headerIndex === headers.length - 1"
                  class="custom-td"
                >
                  <div
                    class="btn-pointer"
                    v-b-tooltip.hover
                    title="Prorrogar Titulo"
                    @click="
                      item.btn_prorroga ? btnProrroga(item.documento) : null
                    "
                    :class="{
                      disabled: !item.btn_prorroga,
                    }"
                  >
                    <img
                      v-if="item.btn_prorroga"
                      src="../../assets/titulo_prorroga.png"
                      alt="Prorrogar"
                      class="calendar-icon"
                    />
                    <img
                      v-else
                      src="../../assets/titulo_prorroga_red.png"
                      alt="Prorrogar"
                      class="calendar-icon"
                    />
                  </div>
                  <div
                    class="btn-pointer"
                    @click="
                      item.btn_cancela ? btnCancela(item.documento) : null
                    "
                    :class="{
                      disabled: !item.btn_cancela,
                    }"
                    v-b-tooltip.hover
                    title="Excluir Titulo"
                  >
                    <img
                      v-if="!item.btn_cancela"
                      src="../../assets/excluido.png"
                      alt="Excluir"
                      class="trash-icon"
                      style="width: 30px; height: 30px"
                      title="Reativar Titulo"
                    />
                    <img
                      v-else
                      src="../../assets/excluir.png"
                      alt="Excluir"
                      class="trash-icon"
                      style="width: 30px; height: 30px"
                      title="Excluir Titulo"
                    />
                  </div>
                  <div
                    class="btn-pointer"
                    @click="
                      item.btn_liquida ? btnLiquida(item.documento) : null
                    "
                    :class="{
                      disabled: !item.btn_liquida,
                    }"
                    v-b-tooltip.hover
                    title="Liquidar Titulo"
                  >
                    <img
                      v-if="!item.btn_liquida"
                      src="../../assets/titulo_liquida_red.png"
                      alt="Prorrogar"
                      class="calendar-icon"
                    />
                    <img
                      v-else
                      src="../../assets/titulo_liquida.png"
                      alt="Prorrogar"
                      class="calendar-icon"
                    />
                  </div>
                  <div
                    class="btn-pointer"
                    :class="{
                      disabled: !item.btn_boleto,
                    }"
                    @click="item.btn_boleto ? btnRecibo(item.documento) : null"
                    v-b-tooltip.hover
                    title="Recibo"
                  >
                    <img
                      v-if="!item.btn_boleto"
                      src="../../assets/imprimir_red.png"
                      alt="Prorrogar"
                      class="calendar-icon"
                    />
                    <img
                      v-else
                      src="../../assets/imprimir.png"
                      alt="Prorrogar"
                      class="calendar-icon"
                    />
                  </div>
                </div>
              </template>
            </td>
          </template>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { VDataTable } from "vuetify/lib/components/index.mjs";
import axios from "axios";
export default {
  components: {
    VDataTable,
  },
  data() {
    return {
      userData: {},
      search: "",
      selected: [],
      selectedItem: null,
      lotesChecked: [],
      titulos: {
        dt_emissao_inicio: null,
        dt_emissao_fim: null,
        dt_vencimento_inicio: null,
        dt_vencimento_fim: null,
      },
      receita_filtrada: [],
      receitas: [],
      loading: true,
      lotesCombo: [],
      boleto: [],
      recibo: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      headers: [
        {
          title: "Documento",
          value: "documento",
          search: "",
        },
        {
          title: "Lote",
          value: "lote",
          search: "",
        },
        {
          title: "Emissão",
          value: "dt_emissao",
          search: "",
        },
        {
          title: "Vencimento",
          value: "dt_vencimento",
          search: "",
        },
        {
          title: "Valor",
          value: "valor",
          search: "",
        },
        {
          title: "Situação",
          value: "situacao",
          search: "",
        },
        {
          title: "Pagamento",
          value: "dt_pagamento",
          search: "",
        },
        {
          value: "actions",
          search: "",
        },
      ],
      emptyInputs: [
        {
          documento: "",
          lote: "",
          dt_emissao: "",
          dt_vencimento: "",
          valor: "",
          situacao: "",
          dt_pagamento: "",
          actions: "",
        },
      ],
    };
  },

  methods: {
    async gerarTitulos(selectedItem) {
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const storedToken = JSON.parse(localStorage.getItem("predio"));
        const selectedToken = selectedItem;
        const data = {
          lote_token: selectedToken,
          predio_token: storedToken.predio_token,
          dt_emissao_inicio: this.titulos.dt_emissao_inicio,
          dt_emissao_fim: this.titulos.dt_emissao_fim,
          dt_vencimento_inicio: this.titulos.dt_emissao_inicio,
          dt_vencimento_fim: this.titulos.dt_emissao_fim,
        };

        console.log("@@@@@@@@@@@\n", JSON.stringify(data));
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/titulosLotes`,
          data,
          { headers }
        );
        const responseData = response.data[0].func_json_titulos_lote;
        this.receitas = responseData;
        this.receita_filtrada = this.receitas;
        console.log("WWWWWWWWWWWW\n",this.receita_filtrada )
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      }
    },

    async loadLotes() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/lotesPredios`,
          data,
          { headers }
        );
        const responseData = response.data[0].func_json_lotes_predio;
        this.lotesCombo = responseData;
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },

    async btnCancela(documento) {
      console.log("#####################################");
      this.$router.push({
        name: "titulos-receber/cancela",
        query: {
          documento,
        },
      });
    },

    async btnProrroga(documento) {
      this.$router.push({
        name: "titulos-receber/prorroga",
        query: {
          documento,
        },
      });
    },

    async btnRecibo(documento) {
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.get(
          `${process.env.AUTH_API_URL}/service/gerencia/getPrediosTitulosById/${documento}`,
          { headers }
        );
        this.recibo = response.data;
        const data = {
          titulo_token: this.recibo.token,
        };
        const imprimirRecibo = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/imprimirRecibo`,
          data,
          { headers }
        );

        const newTab = window.open();
        newTab.document.write(
          imprimirRecibo.data[0].func_imprime_recibo_titulo
        );
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },

    async btnLiquida(documento) {
      this.$router.push({
        name: "titulos-receber/liquida",
        query: {
          documento,
        },
      });
    },
    saveSearchQuery() {
      // Salva o valor do campo de pesquisa no localStorage
      localStorage.setItem("searchQuery", this.searchQuery);
      const searchQuery = localStorage.getItem("searchQuery");
      console.log("saveSearchQuery:", searchQuery); // Imprime no console
    },
    filterTable() {
      this.receita_filtrada = this.receitas.filter((item) => {
        return this.headers.every((header) => {
          if (header.search.trim() === "") return true;
          const value = String(item[header.value]).toLowerCase();
          const search = header.search.toLowerCase();

          return value.includes(search);
        });
      });
    },
    filterOnEnter() {
      console.log("Enter pressionado");
      this.filterTable();
    },
    filterOnBlur() {
      console.log("Campo perdeu o foco");
      this.filterTable();
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.loadLotes();
  },
  computed: {
    displayedItems() {
      console.log(
        this.emptyInputs
      );

      return [...this.emptyInputs, ...this.receita_filtrada];
    },
  },
};
</script>

<style scoped>
.container {
  margin-right: 10px;
}

.btn {
  display: flex;
  align-items: center;
}
.custom-td {
  display: flex;
}

.btn-pointer {
  margin-left: 20px;
  cursor: pointer;
}
.disabled {
  pointer-events: none;
}
</style>
