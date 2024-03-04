<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <AppBar />
  <v-autocomplete
    v-model="test"
    :items="lotesCombo"
    label="Selecione um lote"
    item-title="nome"
    item-value="id"
  ></v-autocomplete>
  <div class="btn-pointer" @click="redirectToView(item.id)">
    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
  </div>
  <v-text-field
    v-model="test"
    type="date"
    label="Data de vencimento"
  ></v-text-field>
  <v-text-field v-model="test" type="number" label="Valor total"></v-text-field>
  <div class="btn-pointer" @click="redirectToRegister()">
    <font-awesome-icon :icon="['fas', 'plus']" />
  </div>
  <v-text-field v-model="test" type="text" label="Observação"></v-text-field>
  <v-data-table
    :headers="headers"
    :search="searchQuery"
    :items="lotes"
    :rows-per-page-items="itemsPerPage"
    :footer-props="footerProps"
    density="default"
  >
    <!-- eslint-disable vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
      <div class="custom-td">
        <v-checkbox label="Checkbox" @click="item"></v-checkbox>
      </div>
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
      lotes: [],
      lotesCombo: [],
      test: [],
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
          value: "observaao",
        },
        {
          value: "actions",
        },
      ],
    };
  },
  computed: {
    filteredLotes() {
      const query = this.searchQuery.toLowerCase().trim();

      const filteredItems = this.lotes.filter((item) => {
        const descricao = item.lote.toLowerCase();
        const prediosAreasDescricao = item.predios_areas
          ? item.predios_areas.descricao.toLowerCase()
          : "";

        return (
          descricao.includes(query) || prediosAreasDescricao.includes(query)
        );
      });

      // Ordena os itens pelo nome da descrição
      return filteredItems.sort((a, b) =>
        a.descricao.localeCompare(b.descricao)
      );
    },
  },
  methods: {
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
        console.log(this.lotesCombo);
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
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
        item.excluido = !item.excluido;
        await axios.put(
          `${process.env.MANAGEMENT_API_URL}/PrediosEquipamentos/excluir/${item.id}`,
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
    this.loadLotes();
    axios
      .post(`${process.env.MANAGEMENT_API_URL}/loteLista`)
      .then((response) => {
        this.lotes = response.data;
        console.log("ASDA", this.lotes);
      })
      .catch((error) => {
        console.error("Erro na chamada de API:", error);
      });
    // Recarrega o valor do campo de pesquisa do localStorage
    const searchQuery = localStorage.getItem("searchQuery");
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
