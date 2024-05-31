<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <v-progress-circular
    class="loading-spinner"
    indeterminate
    size="64"
    v-if="loading"
  ></v-progress-circular>
  <div v-else>
    <AppBar />
    <v-row>
      <div class="btn-pointer mt-8 mb-10" @click="redirectToRegister()">
        <img
          class="ml-8 mr-2"
          style="width: 40px; height: 40px"
          src="../../assets/novo.png"
          alt="novo"
        />
      </div>
      <h1 class="mt-8 mb-10" style="color: #777777">Lotes</h1>
    </v-row>
    <v-app>
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
            <template
              v-for="(header, headerIndex) in headers"
              :key="headerIndex"
            >
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
                        title="Reativar"
                      />
                      <img
                        v-else
                        src="../../assets/ativo.png"
                        alt="Excluir"
                        class="trash-icon"
                        style="width: 40px; height: 40px"
                        title="Excluir"
                      />
                    </div>
                  </div>
                </template>
              </td>
            </template>
          </tr>
        </template>
      </v-data-table>
    </v-app>
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
      filtrados_lotes: [],
      lotes: [],
      loading: true,
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
          title: "Lote",
          value: "lote",
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
          title: "Ações",
          value: "actions",
          search: "",
        },
      ],
      emptyInputs: [
        {
          data: "",
          lote: "",
          conta: "",
          valor: "",
          cobrar: "",
        },
      ],
    };
  },
  computed: {
    displayedItems() {
      return [...this.emptyInputs, ...this.filtrados_lotes];
    },
  },
  methods: {
    redirectToView(id) {
      this.$router.push({
        name: "pi-lotes-receitas/index/vizualizar",
        query: {
          id,
        },
      });
    },
    redirectToRegister() {
      this.$router.push({ name: "pi-lotes-receitas/index/cadastro" });
    },
    redirectToUpdate(id) {
      this.$router.push({
        name: "pi-lotes-receitas/index/atualizar",
        query: {
          id,
        },
      });
    },
    async toggleExclusion(item) {
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        item.excluido = !item.excluido;
        await axios.put(
          `${process.env.AUTH_API_URL}/service/gerencia/updateReceitaLotes/${item.id}`,
          {
            excluido: item.excluido,
          },
          { headers }
        );
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
    filterTable() {
      this.filtrados_lotes = this.lotes.filter((item) => {
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
    updateSearchFieldWidth() {
      const headerTitle = this.$refs.headerTitle;
      if (headerTitle) {
        this.searchFieldWidth = headerTitle.clientWidth + "px";
      }
    },
  },
  mounted() {
    console.log("###################TabLotes####################");
    const storedToken = JSON.parse(localStorage.getItem("predio"));
    const data = {
      predio_id: storedToken.predio_id,
    };
    const headers = {
      Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
    };
    axios
      .post(
        `${process.env.AUTH_API_URL}/service/gerencia/listaLotesReceita`,
        data,
        { headers }
      )
      .then((response) => {
        this.lotes = response.data;
        this.filtrados_lotes = this.lotes;
        console.log(response);
      })
      .catch((error) => {
        console.error("Erro na chamada de API:", error);
      })
      .finally(() => {
        this.loading = false; // Corrigindo a atribuição do loading
      });
    // Recarrega o valor do campo de pesquisa do localStorage
    const searchQuery = localStorage.getItem("searchQuery");
    this.searchQuery = searchQuery || "";
  },
  updated() {
    this.updateSearchFieldWidth();
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
