<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>
<template>
  <AppBar />
  <v-container>
    <h1 class="ml-15 mt-4 mb-10" style="color: #777777">
      Negocicação de Títulos
    </h1>
    <v-row class="mt-6" no-gutters>
      <v-col class="ml-13">
        <v-autocomplete
          v-model="selectedItem"
          :items="lotesCombo"
          label="Selecione um lote"
          item-title="nome"
          item-value="token"
          @change="onLoteChange"
          @update:search="onLoteChange"
        ></v-autocomplete>
      </v-col>
      <v-col class="btn-pointer" @click="gerarReceitas(selectedItem)">
        <img
          style="width: 40px; height: 40px"
          src="../../assets/visualizar.png"
          alt="Visualizar"
        />
      </v-col>
      <v-col class="ml-5">
        <v-text-field
          v-model.number="valorTitulos"
          label="Valor Títulos"
          readonly
          disabled
          class="opacity-75"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          class="ml-6"
          v-mask="'#####.##'"
          v-model.number="valorNegociado"
          label="Valor Negociado"
        ></v-text-field>
      </v-col>

      <v-col class="ml-5">
        <v-text-field
          v-model.number="parcelas"
          label="Parcelas"
          :rules="[maxParcelas]"
          @input="checkParcelas"
        ></v-text-field>
      </v-col>
      <v-col class="btn-pointer" @click="showModal = true">
        <img
          style="width: 40px; height: 40px"
          src="../../assets/novo.png"
          alt="novo"
        />
      </v-col>
    </v-row>
    <v-row class="ml-10 mr-10">
      <v-col v-for="(header, index) in headers" :key="header.key">
        <!-- Verifica se não é a última coluna -->
        <template v-if="index < headers.length">
          <v-text-field
            v-model="header.search"
            :label="header.title"
            prepend-inner-icon="mdi-magnify"
            outlined
            hide-details
            single-line
            @keydown.enter="filterOnEnter"
            @blur="filterOnBlur"
            ref="searchFields"
            :class="'custom-text-field custom-text-field-' + index"
          ></v-text-field>
        </template>
      </v-col>
    </v-row>
    <div style="overflow-x: auto">
      <v-data-table
        class="mt-9"
        :headers="headers"
        :items="filteredReceita"
        v-model="selected"
        :rows-per-page-items="itemsPerPage"
        :footer-props="footerProps"
        show-select
        density="default"
        item-selectable="selectable"
        @change="sumCheckedValues"
        fixed
      >
      </v-data-table>
    </div>
    <v-btn class="mt-8" color="red" @click="returnToMainPage"> Voltar</v-btn>
    <ModalParcelas
      v-model:show="showModal"
      :selected-item="selectedItem"
      :valor-titulo="valorTitulos"
      :valor-negociado="valorNegociado"
      :parcelas="parcelas"
    />

  </v-container>
</template>
<script>
import { VDataTable } from "vuetify/lib/components/index.mjs";
import axios from "axios";
import ModalParcelas from "./ModalParcelas.vue";

export default {
  components: {
    ModalParcelas,
    VDataTable,
  },
  data() {
    return {
      filteredReceita: [], // preocurar o correspondente e alterar
      showModal: false,
      selected: [],
      receitas: [],
      selectedItem: null,
      selectedItemTitle: "",
      valorNegociado: null,
      valorTitulos: null,
      parcelas: null,
      lotesCombo: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      headers: [
        { title: "Título", value: "titulo", search: "", width: "25%" },
        { title: "Vencimento", value: "data", search: "", width: "25%" },
        { title: "Valor", value: "valor", search: "", width: "25%" },
        {
          title: "Observação",
          value: "observacao",
          search: "",
          width: "25%",
        }, // Defina a largura aqui
      ],
    };
  },
  computed: {
    valorTotal() {
      return this.valorTitulos || 0;
    },
  },
  methods: {
    returnToMainPage() {
      this.$router.push("/panel/index");
    },
    onLoteChange() {
      console.log("Selected Item Title:", this.selectedItem); // Exiba o título no console
    },
    maxParcelas(value) {
      if (value >= 12) {
        return "O número máximo de parcelas é 12";
      }
      return true;
    },
    checkParcelas() {
      if (this.parcelas > 12) {
        this.parcelas = 12;
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
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      }
    },
    sumCheckedValues() {
      const selectedItems = this.receitas.filter((item) =>
        this.selected.includes(item.id)
      );

      let sum = 0;

      selectedItems.forEach((item) => {
        if (item.cobrar === "COBRAR") {
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
      this.valorTitulos = sum; // Atualiza o valor do campo lotes.valor
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
      this.filterTable();
    },
    filterOnBlur() {
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
  max-width: 40px;
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
