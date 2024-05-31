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
        <h1 style="color: #777777">Lancamentos Informações</h1>
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
                ></v-text-field>
              </template>
              <template v-else-if="headerIndex !== headers.length - 1">
                <td v-if="header.title === 'Conta'">
                  {{ item.pi_contas.descricao }}
                </td>
                <td v-if="header.title === 'Equipamento'">
                  {{
                    item.predios_equipamentos
                      ? item.predios_equipamentos.descricao
                      : ""
                  }}
                </td>
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
      userData: {},
      filteredLancamentosInformacoes: [],
      loading: true,
      lancamentosInformacoes: [],
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
          title: "Data",
          value: "data",
          search: "",
        },
        {
          title: "Conta",
          search: "",
        },
        {
          title: "Quantidade",
          value: "quantidade",
          search: "",
        },
        {
          title: "Valor",
          value: "valor",
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
      return [...this.emptyInputs, ...this.filteredLancamentosInformacoes];
    },
  },
  methods: {
    filterTable() {
      this.filteredLancamentosInformacoes = this.lancamentosInformacoes.filter(
        (item) => {
          return this.headers.every((header) => {
            if (header.search.trim() === "") return true;
            const value = String(item[header.value]).toLowerCase();
            const search = header.search.toLowerCase();

            return value.includes(search);
          });
        }
      );
    },
    filterOnEnter() {
      this.filterTable();
    },
    filterOnBlur() {
      this.filterTable();
    },
    redirectToView(id) {
      this.$router.push({
        name: "pi-informacoes/index/vizualizar",
        query: {
          id,
        },
      });
    },
    redirectToRegister() {
      this.$router.push("/pi-informacoes/index/cadastro");
    },
    redirectToUpdate(id) {
      this.$router.push({
        name: "pi-informacoes/index/atualizar",
        query: {
          id,
        },
      });
    },
    async toggleExclusion(item) {
      try {
        item.excluido = !item.excluido;
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Novo cabeçalho com token
        };
        const response = await axios.put(
          `${process.env.AUTH_API_URL}/service/gerencia/updateLancamentos/${item.id}`,
          { excluido: item.excluido },
          { headers }
        );
        console.log("Resposta da requisição:", response.data);
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
    const storedToken = JSON.parse(localStorage.getItem("predio"));
    const data = {
      predio_id: storedToken.predio_id,
    };
    const headers = {
      Authorization: `Bearer ${this.userData.token}`, // Novo cabeçalho com token
    };
    axios
      .post(
        `${process.env.AUTH_API_URL}/service/gerencia/tabLancamentosInformacoes`,
        data,
        { headers }
      )
      .then((response) => {
        this.lancamentosInformacoes = response.data.lancamentos;
        this.filteredLancamentosInformacoes = this.lancamentosInformacoes;
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
