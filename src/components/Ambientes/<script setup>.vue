<script setup>
{
  /* import AppBar from "@/layouts/default/AppBar.vue"; */
}
</script>

<template>
  <AppBar />
  <div class="btn-pointer mt-5 mb-2" @click="redirectToRegister()">
    <font-awesome-icon :icon="['fas', 'plus']" size="lg" />
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
    :items="filteredPrediosAmbientes"
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
      filteredPrediosAmbientes: [],

      // Flag para indicar se a tecla "Enter" foi pressionada
      enterPressed: false,
      // Flag para indicar se o input perdeu o foco
      inputBlurred: false,
      predios_ambientes: [],
      searchQueries: {}, // Object to store search queries for each column
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
  computed: {
    // filteredPrediosAmbientes() {
    //   const a = this.shouldFilter();
    //   console.log("!@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n", a);
    //   if (this.shouldFilter() === false) {
    //     return this.predios_ambientes;
    //   } else {
    //     return this.predios_ambientes.filter((item) => {
    //       return this.headers.every((header) => {
    //         if (header.search.trim() === "") return true;
    //         const value = String(item[header.value]).toLowerCase();
    //         const search = header.search.toLowerCase();
    //         return value.includes(search);
    //       });
    //     });
    //   }
    // },
  },
  methods: {
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
        item.excluido = !item.excluido;
        await axios.put(
          `${process.env.MANAGEMENT_API_URL}/PrediosAmbiente/excluir/${item.id}`,
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
    shouldFilter() {
      // this.filteredPrediosAmbientes = this.predios_ambientes.filter((item) => {
      //   return this.headers.every((header) => {
      //     return (
      //       !header.search ||
      //       String(item[header.value])
      //         .toLowerCase()
      //         .includes(header.search.toLowerCase())
      //     );
      //   });
      // });
    },
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
    saveSearchQuery() {
      // Salva o valor do campo de pesquisa no localStorage
      this.headers.forEach((header) => {
        localStorage.setItem(`searchQuery_${header.value}, header.search`);
      });
    },
    loadSearchQuery() {
      this.headers.forEach((header) => {
        const searchQuery = localStorage.getItem(`searchQuery_${header.value}`);
        if (searchQuery !== null) {
          header.search = searchQuery;
        }
      });
    },
  },
  mounted() {
    const storedToken = JSON.parse(localStorage.getItem("predio"));
    const data = {
      predio_token: storedToken.predio_token,
    };
    axios
      .post(`${process.env.MANAGEMENT_API_URL}/listaAmbientes, data`)
      .then((response) => {
        this.predios_ambientes = response.data[0].func_json_ambientes;
        this.filteredPrediosAmbientes = this.predios_ambientes;
      })
      .catch((error) => {
        console.error("Erro na chamada de API:", error);
      });

    this.loadSearchQuery(); // Load search queries from localStorage
  },
  watch: {
    headers: {
      handler: "saveSearchQuery",
      deep: true,
    },
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
