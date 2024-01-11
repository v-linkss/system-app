
<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <AppBar/>
  <div class="btn-pointer" @click="redirectToRegister()">
    <font-awesome-icon :icon="['fas', 'plus']" />
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
      equipamentos_modelos: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      headers: [
        {
          title: "Codigo",
          value: "id",
        },
        {
          title: "Descrição",
          value: "descricao",
        },
        {
          title: "Tipo",
          value: "tipo",
        },
        {
          title: "Fabricante",
          value: "fabricante",
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

      const filteredItems = this.equipamentos_modelos.filter((item) => {
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
    redirectToView(id) {
      this.$router.push({
        name: "equipamentos-modelos/index/vizualizar",
        query: {
          id,
        },
      });
    },
    redirectToRegister() {
      this.$router.push({name:"equipamentos-modelos/index/cadastro"});
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
  },
  mounted() {
    const storedToken = JSON.parse(localStorage.getItem("predio"))
      const data = {
       token_predio:storedToken.predio_token
      }
    axios
      .post( `${process.env.MANAGEMENT_API_URL}/listaModeloEquipamentos`,data)
      .then((response) => {
        this.equipamentos_modelos = response.data[0].func_json_modelos_equipamentos;
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
