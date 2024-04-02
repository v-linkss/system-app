<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <AppBar />
  <div class="btn-pointer mt-8 mb-10" @click="redirectToRegister()">
    <v-row>
      <img
        class="ml-8 mr-2"
        style="width: 40px; height: 40px"
        src="../../assets/novo.png"
        alt="novo"
      />
      <h1 style="color:#777777">Tipos Equipamentos</h1>
    </v-row>
  </div>
  <!-- eslint-disable vue/valid-v-slot -->
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
    :items="filteredPrediosEquipamentos"
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
      filteredPrediosEquipamentos: [],
      tipos_equipamentos: [],
      segmentos: [],
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
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
          title: "Sistema",
          value: "sistema",
          search: "",
        },
        {
          title: "Segmento",
          value: "segmento",
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
  methods: {
    redirectToView(id) {
      this.$router.push({
        name: "equipamentos-tipos/index/vizualizar",
        query: {
          id,
        },
      });
    },
    redirectToRegister() {
      this.$router.push("/equipamentos-tipos/index/cadastro");
    },
    redirectToUpdate(id) {
      this.$router.push({
        name: "equipamentos-tipos/index/atualizar",
        query: {
          id,
        },
      });
    },
    async toggleExclusion(item) {
      try {
        item.excluido = !item.excluido;
        await axios.put(
          `${process.env.MANAGEMENT_API_URL}/updateEquipamentos/${item.id}`,
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
      this.filteredPrediosEquipamentos = this.tipos_equipamentos.filter(
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
      .post(`${process.env.MANAGEMENT_API_URL}/listaTiposEquipamentos`, data)
      .then((response) => {
        this.tipos_equipamentos = response.data[0].func_json_tiposequipamentos;
        this.filteredPrediosEquipamentos = this.tipos_equipamentos;
      })
      .catch((error) => {
        console.error("Erro na chamada de API:", error);
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

.btn-pointer {
  cursor: pointer;
}

</style>
