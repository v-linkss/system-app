<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <AppBar />
  <v-row class="mt-6" no-gutters>
    <v-col class="ml-2">
      <v-autocomplete
        v-model="selectedItem"
        :items="lotesCombo"
        label="Selecione um lote"
        item-title="nome"
        item-value="token"
      ></v-autocomplete>
    </v-col>
    <div>
      <v-col class="btn-pointer" @click="gerarReceitas(selectedItem)">
        <img style="width: 40px; height: 40px;" src="../../assets/visualizar.png" alt="Visualizar" />
      </v-col>
    </div>
    <v-col>
      <v-text-field
        class="ml-6"
        v-model="lotes.data_vencimento"
        type="date"
        label="Data de vencimento"
      ></v-text-field>
    </v-col>
    <v-col class="ml-5">
      <v-text-field
        v-model="lotes.valor"
        type="number"
        label="Valor total"
        readonly
        disabled
        class="opacity-75"
      ></v-text-field>
    </v-col>
    <div>
      <v-col
        class="btn-pointer"
        @click="gerarBoletos()"
        :class="{ disabled: valorTotal <= 0 }"
      >
      <img style="width: 40px; height: 40px;" src="../../assets/novo.png" alt="novo" />
      </v-col>
    </div>
  </v-row>

  <v-text-field
    v-model="lotes.observacao"
    type="text"
    label="Observação"
  ></v-text-field>

  <v-data-table
    :headers="headers"
    :search="searchQuery"
    :items="receitas"
    v-model="selected"
    :rows-per-page-items="itemsPerPage"
    :footer-props="footerProps"
    show-select
    density="default"
    item-selectable="selectable"
    @change="sumCheckedValues"
  >
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.header> </template>
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
      selected: [],
      selectedItem: null,
      lotesChecked: [],
      lotes: {
        data_vencimento: null,
        valor: null,
        observacao: null,
      },

      receitas: [],
      lotesCombo: [],
      boleto: [],
      testVal: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      headers: [
        {
          title: "Data",
          value: "data",
        },
        {
          title: "Conta",
          value: "conta",
        },
        {
          title: "Valor",
          value: "valor",
        },
        {
          title: "Cobrar/Devolver",
          value: "cobrar",
        },
        {
          title: "Observação",
          value: "observacao",
        },
      ],
    };
  },
  computed: {
    valorTotal() {
      return this.lotes.valor || 0;
    },
  },
  methods: {
    async gerarReceitas(selectedItem) {
      try {
        const selectedToken = selectedItem;
        const data = {
          lote_token: selectedToken,
        };
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/loteReceita`,
          data
        );
        const responseData = response.data[0].func_json_receitas_lote;
        this.receitas = responseData;
        console.log(this.receitas);
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      }
    },

    async gerarBoletos() {
      try {
        const storedTokenPredio = JSON.parse(localStorage.getItem("predio"));
        const storedTokenUser = JSON.parse(localStorage.getItem("user"));
        const selectedToken = this.selectedItem;
        const receitasSelecionadas = this.selected.map((itemId) => {
          const receita = this.receitas.find((item) => item.id === itemId);
          return { receita_token: receita.token };
        });
        const data = {
          observacao: this.lotes.observacao,
          valor: this.lotes.valor,
          data_vencimento: this.lotes.data_vencimento,
          lote_token: selectedToken,
          predio_token: storedTokenPredio.predio_token,
          user_token: storedTokenUser.token,
          receitas: receitasSelecionadas,
        };
        console.log(data);
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/geraBoletos`,
          data
        );
        const responseData = response.data[0].func_gera_boleto_lote;
        this.boleto = responseData;
        if (this.boleto[0].integra_banco === true) {
          const dataBoleto = {
            titulo_token: this.boleto[0].titulo_token,
          };
          const response = await axios.post(
            `${process.env.MANAGEMENT_API_URL}/integraBanco`,
            dataBoleto
          );
          const responseDataBoleto = response.data[0].func_integra_banco;
          window.open(responseDataBoleto[0].link_boleto, "_blank");
        } else {
          [];
        }
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

    saveSearchQuery() {
      // Salva o valor do campo de pesquisa no localStorage
      localStorage.setItem("searchQuery", this.searchQuery);
      const searchQuery = localStorage.getItem("searchQuery");
      console.log("saveSearchQuery:", searchQuery); // Imprime no console
    },

    sumCheckedValues() {
      // Filtra os itens marcados
      const selectedItems = this.receitas.filter((item) =>
        this.selected.includes(item.id)
      );

      // Inicializa a soma
      let sum = 0;

      // Itera sobre os itens marcados
      selectedItems.forEach((item) => {
        // Verifica se o item deve ser cobrado
        if (item.cobrar === "COBRAR") {
          // Adiciona o valor apenas se a condição for atendida
          sum += parseFloat(item.valor);
        } else if (item.cobrar === "DEVOLVER") {
          const checkSum = sum - parseFloat(item.valor);
          if (checkSum >= 0) {
            sum = checkSum;
          } else {
            alert(
              "Alerta: Valor inválido encontrado (o valor devolvido não pode ser superior ao cobtrado)."
            );
          }
        }
      });
      this.lotes.valor = sum; // Atualiza o valor do campo lotes.valor
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
.btn-pointer {
  cursor: pointer;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-td {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-pointer {
  margin-left: 20px;
  cursor: pointer;
}

.red-icon {
  color: red;
}

.gray-icon {
  color: gray;
}

.disabled {
  pointer-events: none;
}
</style>
