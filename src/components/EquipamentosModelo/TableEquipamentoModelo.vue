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
    <div class="btn-pointer mt-8 mb-10" @click="redirectToRegister()">
      <v-row>
        <img
          class="ml-8 mr-2"
          style="width: 40px; height: 40px"
          src="../../assets/novo.png"
          alt="novo"
        />
        <h1 style="color: #777777">Modelos Equipamentos</h1>
      </v-row>
    </div>

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
      filteredPrediosEquipamentos: [],
      equipamentos_modelos: [],
      loading: true,
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      emptyInputs: [
        {
          id: "",
          descricao: "",
          tipo: "",
          fabricante: "",
          actions: "",
        },
      ],
      headers: [
        {
          title: "Codigo",
          value: "id",
          search: "",
        },
        {
          title: "Descrição",
          value: "descricao",
          search: "",
        },
        {
          title: "Tipo",
          value: "tipo",
          search: "",
        },
        {
          title: "Fabricante",
          value: "fabricante",
          search: "",
        },
        {
          title: "Ações",
          value: "actions",
          search: "",
        },
      ],
    };
  },
  computed: {
    displayedItems() {
      return [...this.emptyInputs, ...this.filteredPrediosEquipamentos];
    },
  },
  methods: {
    redirectToView(id) {
      this.$router.push({
        name: "equipamentos-modelos/index/vizualizar",
        query: {
          id,
        },
      });
    },
    redirectToRegister() {
      this.$router.push({ name: "equipamentos-modelos/index/cadastro" });
    },
    redirectToUpdate(id) {
      this.$router.push({
        name: "equipamentos-modelos/index/atualizar",
        query: {
          id,
        },
      });
    },
    async toggleExclusion(item) {
      try {
        item.excluido = !item.excluido;
        await axios.put(
          ` ${process.env.MANAGEMENT_API_URL}/deleteModeloEquipamentos/${item.id}`,
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
    filterTable() {
      this.filteredPrediosEquipamentos = this.equipamentos_modelos.filter(
        (item) => {
          return this.headers.every((header) => {
            if (header.search.trim() === "") return true;
            const value = String(item[header.value]).toLowerCase();
            const search = header.search.toLowerCase();

            return value.includes(search);
          });
        }
      );
      // console.log(this.filteredPrediosAmbientes); // Pa
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
    const storedToken = JSON.parse(localStorage.getItem("predio"));
    const data = {
      token_predio: storedToken.predio_token,
    };
    axios
      .post(`${process.env.MANAGEMENT_API_URL}/listaModeloEquipamentos`, data)
      .then((response) => {
        this.equipamentos_modelos =
          response.data[0].func_json_modelos_equipamentos;
        this.filteredPrediosEquipamentos = this.equipamentos_modelos;
      })
      .catch((error) => {
        console.error("Erro na chamada de API:", error);
      })
      .finally(() => {
        this.loading = false; // Corrigindo a atribuição do loading
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
