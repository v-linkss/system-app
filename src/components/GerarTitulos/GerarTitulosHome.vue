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
        <img
          style="width: 40px; height: 40px"
          src="../../assets/visualizar.png"
          alt="Visualizar"
        />
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
        <img
          style="width: 40px; height: 40px"
          src="../../assets/novo.png"
          alt="novo"
        />
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
    :items="displayedItems"
    :rows-per-page-items="itemsPerPage"
    :footer-props="footerProps"
    density="default"
  >
    <template v-slot:item="{ item, index }">
      <tr>
        <template v-for="(header, headerIndex) in headers" :key="headerIndex">
          <td>
            <template v-if="index === 0 && headerIndex !== headers.length">
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
            <template v-else-if="headerIndex !== headers.length">
              {{ item[header.value] }}
            </template>
          </td>
        </template>
      </tr>
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
      filteredReceita: [], // preocurar o correspondente e alterar
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
          search: "",
        },
        {
          title: "Conta",
          value: "conta",
          search: "",
        },
        {
          title: "Valor",
          value: "valor",
          search: "",
        },
        {
          title: "Cobrar/Devolver",
          value: "cobrar",
          search: "",
        },
        {
          title: "Observação",
          value: "observacao",
          search: "",
        },
      ],
      emptyInputs: [
        {
          data: "",
          conta: "",
          valor: "",
          cobrar: "",
          observacao: "",
        },
      ],
    };
  },
  computed: {
    valorTotal() {
      return this.lotes.valor || 0;
    },
    displayedItems() {
      return [...this.emptyInputs, ...this.filteredReceita];
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
        this.filteredReceita = this.receitas;
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
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n", responseData);
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
    filterTable() {
      this.filteredReceita = this.receitas.filter((item) => {
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
