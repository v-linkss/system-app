<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
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
      style="height: 55px"
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
    :search="search"
    :items="receitas"
    :rows-per-page-items="itemsPerPage"
    :footer-props="footerProps"
    density="default"
  >
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
      <div class="custom-td">
        <div
          class="btn-pointer"
          @click="item.btn_prorroga ? btnProrroga(item.documento) : null"
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
          @click="item.btn_cancela ? btnCancela(item.documento) : null"
          :class="{
            disabled: !item.btn_cancela,
          }"
        >
        <img
            v-if="!item.btn_cancela"
            src="../../assets/excluido.png"
            alt="Excluir"
            class="trash-icon"
            style="width: 30px; height: 30px"
          />
          <img
            v-else
            src="../../assets/ativo.png"
            alt="Excluir"
            class="trash-icon"
            style="width: 30px; height: 30px"
          />
        </div>
        <div
          class="btn-pointer"
          @click="item.btn_liquida ? btnLiquida(item.documento) : null"
          :class="{
            disabled: !item.btn_liquida,
          }"
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
  </v-data-table>
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
      receitas: [],
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
        },
        {
          title: "Lote",
          value: "lote",
        },
        {
          title: "Emissão",
          value: "dt_emissao",
        },
        {
          title: "Vencimento",
          value: "dt_vencimento",
        },
        {
          title: "Valor",
          value: "valor",
        },
        {
          title: "Situação",
          value: "situacao",
        },
        {
          title: "Pagamento",
          value: "dt_pagamento",
        },
        {
          value: "actions",
        },
      ],
    };
  },

  methods: {
    async gerarTitulos(selectedItem) {
      try {
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
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/titulosLotes`,
          data
        );
        const responseData = response.data[0].func_json_titulos_lote;
        this.receitas = responseData;
        console.log(this.receitas);
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
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/lotesPredios`,
          data
        );
        const responseData = response.data[0].func_json_lotes_predio;
        this.lotesCombo = responseData;
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },

    async btnCancela(documento) {
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
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/getPrediosTitulosById/${documento}`
        );
        this.recibo = response.data;
        const data = {
          titulo_token: this.recibo.token,
        };
        const imprimirRecibo = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/imprimirRecibo`,
          data
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
  },
  mounted() {
    this.loadLotes();
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
