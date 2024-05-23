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
          type="number"
          v-model="valorTitulos"
          label="Valor Títulos"
          readonly
          disabled
          class="opacity-75"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          class="ml-6"
          v-mask="'######.##'"
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
      <v-col class="btn-pointer" @click="openModal">
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
        :items="filteredLotes"
        v-model="selected"
        item-value="predio_titulo_id"
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
      :selected-item="selectedItemTitle"
      :valor-titulo="valorTitulos"
      :valor-negociado="valorNegociado"
      :parcelas="parcelas"
      :parcelas-detalhadas="parcelasDetalhadas"
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
      filteredLotes: [], // preocurar o correspondente e alterar
      showModal: false,
      selected: [],
      titulos_lote: [],
      selectedItem: null,
      selectedItemTitle: null,
      valorNegociado: null,
      parcelasDetalhadas: [],
      valorTitulos: null,
      parcelas: null,
      lotesCombo: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      headers: [
        { title: "Título", value: "documento", search: "", width: "25%" },
        {
          title: "Vencimento",
          value: "dt_vencimento",
          search: "",
          width: "25%",
        },
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
    openModal() {
      this.calcularParcelas();
      this.showModal = true;
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
        const storedToken = JSON.parse(localStorage.getItem("predio"));
        const selectedToken = selectedItem;
        const data = {
          lote_token: selectedToken,
          predio_token: storedToken.predio_token,
        };
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/titulosLotes`,
          data
        );
        const responseData = response.data[0].func_json_titulos_lote;
        this.titulos_lote = responseData;
        this.filteredLotes = this.titulos_lote;
        this.selectedItemTitle = this.titulos_lote[0].lote;
        console.log(this.titulos_lote);
      } catch (error) {
        console.error("Erro ao carregar titulos_lote:", error);
      }
    },
    sumCheckedValues() {
      const selectedItems = this.titulos_lote.filter((item) =>
        this.selected.includes(item.predio_titulo_id)
      );

      let sum = 0;


      // Soma os valores dos itens selecionados
      selectedItems.forEach((item) => {
        sum += parseFloat(item.valor);
      });

      // Atualiza o valor total
      this.valorTitulos = sum;
      console.log(this.selected, selectedItems);
    },
    calcularParcelas() {
      const valorParcela = (this.valorNegociado / this.parcelas).toFixed(2);
      const primeiraParcela = (
        this.valorNegociado -
        valorParcela * (this.parcelas - 1)
      ).toFixed(2);

      this.parcelasDetalhadas = Array(this.parcelas)
        .fill()
        .map((_,index) => {
          return {
            numero: index + 1,
            valor: index === 0 ? primeiraParcela : valorParcela,
          };
        });
    },
    filterTable() {
      this.filteredLotes = this.titulos_lote.filter((item) => {
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
.custom-td {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-pointer {
  margin-left: 20px;
  cursor: pointer;
  max-width: 40px;
}

.disabled {
  pointer-events: none;
}
</style>
