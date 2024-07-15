<!-- Feito -->
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
      <h1 class="mt-8 mb-10" style="color: #777777">Ambientes</h1>
    </v-row>

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
      filteredPrediosAmbientes: [],
      loading: true,
      predios_ambientes: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      emptyInputs: [
        {
          id: "",
          descricao: "",
          area: "",
          actions: "",
        },
      ],

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
    displayedItems() {
      return [...this.emptyInputs, ...this.filteredPrediosAmbientes];
    },
  },
  methods: {
    filterTable() {
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
      const headers = {
        Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
      };
      try {
        item.excluido = !item.excluido;
        await axios.put(
          `${process.env.AUTH_API_URL}/service/gerencia/deleteAmbientes/${item.id}`,
          {
            excluido: item.excluido,
          },
          { headers }
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
    this.userData = JSON.parse(localStorage.getItem("user"));
    const headers = {
      Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
    };
    const storedToken = JSON.parse(localStorage.getItem("predio"));
    const data = {
      predio_token: storedToken.predio_token,
    };
    axios
      .post(
        `${process.env.AUTH_API_URL}/service/gerencia/listaAmbientes`,
        data,
        { headers }
      )
      .then((response) => {
        this.predios_ambientes = response.data[0].func_json_ambientes;
        this.filteredPrediosAmbientes = this.predios_ambientes;
        console.log(this.filteredPrediosAmbientes)
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
