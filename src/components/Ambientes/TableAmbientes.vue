<!-- Feito -->
<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <v-progress-circular class="loading-spinner" indeterminate size="64" v-if="loading"></v-progress-circular>
  <div v-else>
    <AppBar />
    <div class="btn-pointer mt-8 mb-10" @click="redirectToRegister()">
      <v-row>
        <img
          class="ml-8 mr-2"
          style="width: 40px; height: 40px"
          src="../../assets/novo.png"
          alt="novo"
        />
        <h1 style="color:#777777">Ambientes</h1>
      </v-row>
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
          <div class="btn-pointer" @click="redirectToView(item.id)">
            <img
              style="width: 40px; height: 40px"
              src="../../assets/visualizar.png"
              alt="Visualizar"
            />
          </div>
          <div class="btn-pointer" @click="redirectToUpdate(item.id)">
            <img
              style="width: 40px; height: 40px"
              src="../../assets/editar.png"
              alt="Visualizar"
            />
          </div>
          <div class="btn-pointer" id="exclusão" @click="toggleExclusion(item)">
            <img
              v-if="item.altera"
              src="../../assets/altera.png"
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
      filteredPrediosAmbientes: [],
      loading:true,
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

  methods: {
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
        item.altera = !item.altera;
        await axios.put(
          `${process.env.MANAGEMENT_API_URL}/PrediosAmbiente/excluir/${item.id}`,
          {
            altera: item.altera,
          }
        );
        console.log(item.altera);
      } catch (error) {
        console.error("Erro ao atualizar exclusão:", error);
        item.altera = !item.altera;
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
      })
      .finally(() => {
        this.loading = false; // Corrigindo a atribuição do loading
      });
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
