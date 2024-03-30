<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <AppBar />
  <div class="btn-pointer mt-5 mb-2" @click="redirectToRegister()">
    <img style="width: 40px; height: 40px;" src="../../assets/novo.png" alt="novo" />
  </div>
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
import { VDataTable } from "vuetify/lib/components/index.mjs";
import axios from "axios";
export default {
  components: {
    VDataTable,
  },
  data() {
    return {
      lotes: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      headers: [
        {
          title: "Data",
          value: "data",
        },
        {
          title: "Lote",
          value: "lote",
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
          title: "Ações",
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
        item.altera = !item.altera;
        await axios.put(
          `${process.env.MANAGEMENT_API_URL}/updateReceitaLotes/${item.id}`,
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
    const storedToken = JSON.parse(localStorage.getItem("predio"))
        const data = {
         predio_id:storedToken.predio_id
        }
    axios
      .post(`${process.env.MANAGEMENT_API_URL}/listaLotesReceita`,data)
      .then((response) => {
        this.lotes = response.data;
        console.log(this.lotes)
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
