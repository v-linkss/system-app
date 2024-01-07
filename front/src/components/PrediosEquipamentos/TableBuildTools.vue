
<script setup></script>

<template>
  <div>
    <v-text-field v-model="searchQuery" label="Pesquisar" @input="saveSearchQuery"/>
  </div>
  <div @click="redirectToRegister" class="btn">
    <v-btn variant="tonal"> Criar </v-btn>
  </div>
  <v-data-table
    :headers="headers"
    :search="searchQuery"
    :items="filteredPrediosEquipamentos"
    :rows-per-page-items="itemsPerPage"
    :footer-props="footerProps"
    density="default"
  >
  <!-- eslint-disable vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
      <div class="custom-td">
        <div class="btn-pointer" @click="redirectToView(item.id)">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </div>
        <div class="btn-pointer" @click="redirectToUpdate(item.id)">
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        </div>
        <div class="btn-pointer" id="exclusão">
          <font-awesome-icon
            :icon="['fas', 'trash']"
            @click="toggleExclusion(item)"
            :class="{
              'red-icon': item.excluido,
              'gray-icon': !item.excluido,
            }"
          />
        </div>
      </div>
    </template>
  </v-data-table>
  <div @click="returnToMainPage" class="btn">
    <v-btn variant="tonal">Retornar </v-btn>
  </div>
</template>
<script>
import { VDataTable } from "vuetify/lib/labs/VDataTable/index.mjs";
import axios from "axios";
export default {
  components: {
    VDataTable,
  },
  data() {
    return {
      predios_equipamentos: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      headers: [
        {
          title: "ID",
          value: "id",
        },
        {
          title: "Codigo",
          value: "codigo",
        },
        {
          title: "Patrimonio",
          value: "patrimonio",
        },
        {
          title: "Descrição",
          value: "descricao",
        },
        {
          title: "Ambiente",
          value: "predios_ambientes.descricao",
        },
        {
          title: "Modulo",
          value: "equipamentos_modelo.codigo",
        },
        {
          title: "Ações",
          value: "actions",
        },
      ],
    };
  },
  computed: {
    filteredPrediosEquipamentos() {
      const query = this.searchQuery.toLowerCase().trim();

      const filteredItems = this.predios_equipamentos.filter((item) => {
        const descricao = item.descricao.toLowerCase();
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
    returnToMainPage() {
      this.$router.push("/home");
    },
    redirectToView(id) {
      this.$router.push({
        name: "ViewBuildTools",
        query: {
          id,
        },
      });
    },
    redirectToRegister() {
      this.$router.push("/RegisterBuildTools");
    },
    redirectToUpdate(id) {
      this.$router.push({
        name: "UpdateBuildTools",
        query: {
          id,
        },
      });
    },
    async toggleExclusion(item) {
      try {
        item.excluido = !item.excluido;
        await axios.put(
          `http://localhost:3000/PrediosEquipamentos/excluir/${item.id}`,
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
    axios
      .get("http://localhost:3000/PrediosEquipamentos")
      .then((response) => {
        this.predios_equipamentos = response.data;
        console.log(this.predios_equipamentos);
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
