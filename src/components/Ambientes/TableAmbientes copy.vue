<!-- Feito -->
<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <AppBar />
  <div class="btn-pointer mt-5 mb-2" @click="redirectToRegister()">
    <img
      style="width: 40px; height: 40px"
      src="../../assets/novo.png"
      alt="novo"
    />
  </div>
  <v-row>
    <v-col v-for="(header, index) in headers" :key="header.key" cols="auto">
      <!-- Verifica se não é a última coluna -->
      <template v-if="index < headers.length - 1">
        <v-text-field
          v-model="header.search"
          :label="'Search ' + header.title"
          prepend-inner-icon="mdi-magnify"
          outlined
          hide-details
          single-line
          @keydown.enter="filterOnEnter"
          @blur="filterOnBlur"
          ref="searchFields"
        ></v-text-field>
      </template>
    </v-col>
  </v-row>
  <v-data-table
    :headers="headers"
    :search="searchQuery"
    :items="filteredPrediosAmbientes"
    :rows-per-page-items="itemsPerPage"
    :footer-props="footerProps"
    density="default"
  >
    <!-- eslint-disable vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
      <div class="custom-td">
        <div
          class="btn-pointer"
          @click="redirectToView(item.id)"
          v-b-tooltip.hover
          title="Visualizar"
        >
          <img
            style="width: 40px; height: 40px"
            src="../../assets/visualizar.png"
            alt="Visualizar"
          />
        </div>
        <div
          class="btn-pointer"
          @click="redirectToUpdate(item.id)"
          v-b-tooltip.hover
          title="Editar"
        >
          <img
            style="width: 40px; height: 40px"
            src="../../assets/editar.png"
            alt="Visualizar"
          />
        </div>
        <div
          class="btn-pointer"
          id="exclusão"
          @click="toggleExclusion(item)"
          v-b-tooltip.hover
          title="Excluir"
        >
          <img
            v-if="item.excluido"
            src="../../assets/excluido.png"
            alt="Excluir"
            class="trash-icon"
            style="width: 40px; height: 40px"
          />
          <img
            v-else
            src="../../assets/ativo.png"
            alt="Excluir"
            class="trash-icon"
            style="width: 40px; height: 40px"
          />
        </div>
      </div>
    </template>
  </v-data-table>
</template>
<script>
// const calculateColumnWidths = () => {
//   const tableWidth = document.querySelector('.v-data-table').clientWidth;
//   const numColumns = headers.value.length - 1; // Descontando a última coluna de ações
//   const columnWidth = `${tableWidth / numColumns}px`;
//   columnWidths.value = Array(numColumns).fill(columnWidth);
// };

import { VDataTable } from "vuetify/lib/components/index.mjs";
import axios from "axios";
export default {
  components: {
    VDataTable,
  },
  data() {
    return {
      filteredPrediosAmbientes: [],

      predios_ambientes: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      headers: [
        {
          title: "Código",
          value: "id",
          search: "",
        },
        {
          title: "Descrição",
          value: "descricao",
          search: "",
        },
        {
          title: "Area",
          value: "area",
          search: "",
        },
        {
          title: "Ações",
          value: "actions",
          search: "", // No search for actions column
        },
      ],
    };
  },
  computed: {
    // filteredPrediosAmbientes() {
    //   const query = this.searchQuery.toLowerCase().trim();
    //   const filteredItems = this.predios_ambientes.filter((item) => {
    //     const descricao = item.descricao.toLowerCase();
    //     const prediosAreasDescricao = item.predios_areas
    //       ? item.predios_areas.descricao.toLowerCase()
    //       : "";
    //     return (
    //       descricao.includes(query) || prediosAreasDescricao.includes(query)
    //     );
    //   });
    //   // Ordena os itens pelo nome da descrição
    //   return filteredItems.sort((a, b) =>
    //     a.descricao.localeCompare(b.descricao)
    //   );
    // },
  },
  methods: {
    //  calculateColumnWidths()  {
    //     const tableWidth = document.querySelector('.v-data-table').clientWidth;
    //     const numColumns = headers.value.length - 1; // Descontando a última coluna de ações
    //     const columnWidth = `${tableWidth / numColumns}px`;
    //     columnWidths.value = Array(numColumns).fill(columnWidth);
    //   };
    filterTable() {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n", this.headers.search);

      this.filteredPrediosAmbientes = this.predios_ambientes.filter((item) => {
        return this.headers.every((header) => {
          if (header.search.trim() === "") return true;
          const value = String(item[header.value]).toLowerCase();
          const search = header.search.toLowerCase();

          return value.includes(search);
        });
      });
      console.log(this.filteredPrediosAmbientes); // Pa
    },
    filterOnEnter() {
      console.log("Enter pressionado");
      this.filterTable();
    },
    filterOnBlur() {
      console.log("Campo perdeu o foco");
      this.filterTable();
    },
    redirectToView(id) {
      this.$router.push({
        name: "predios-ambientes/index/vizualizar",
        query: {
          id,
        },
      });
    },
    redirectToRegister() {
      this.$router.push("/predios-ambientes/index/cadastro");
    },
    redirectToUpdate(id) {
      this.$router.push({
        name: "predios-ambientes/index/alterar",
        query: {
          id,
        },
      });
    },
    async toggleExclusion(item) {
      try {
        item.excluido = !item.excluido;
        await axios.put(
          `${process.env.MANAGEMENT_API_URL}/PrediosAmbiente/excluir/${item.id}`,
          {
            excluido: item.excluido,
          }
        );
        console.log(item.excluido);
      } catch (error) {
        console.error("Erro ao atualizar exclusão:", error);
        item.excluido = !item.excluido;
      }
    },
    saveSearchQuery() {
      // Salva o valor do campo de pesquisa no localStorage
      localStorage.setItem("searchQuery", this.searchQuery);
      const searchQuery = localStorage.getItem("searchQuery");
      console.log("saveSearchQuery:", searchQuery); // Imprime no console
    },
  },
  mounted() {
    const storedToken = JSON.parse(localStorage.getItem("predio"));
    const data = {
      predio_token: storedToken.predio_token,
    };
    axios
      .post(`${process.env.MANAGEMENT_API_URL}/listaAmbientes`, data)
      .then((response) => {
        this.predios_ambientes = response.data[0].func_json_ambientes;
        this.filteredPrediosAmbientes = this.predios_ambientes;
      })
      .catch((error) => {
        console.error("Erro na chamada de API:", error);
      });
    // Recarrega o valor do campo de pesquisa do localStorage
    const searchQuery = localStorage.getItem("searchQuery");
    console.log("Valor carregado do localStorage:", searchQuery); // Imprime no console
    this.searchQuery = searchQuery || "";
  },
};
</script>

<style scoped>
.container {
  margin-right: 10px;
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

.allignButtons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.btn-pointer {
  cursor: pointer;
}
.red-icon {
  color: red;
}

.gray-icon {
  color: gray;
}
</style>
