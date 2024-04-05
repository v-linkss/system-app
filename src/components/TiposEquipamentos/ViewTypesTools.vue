<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <AppBar />
  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <v-container class="data-container mt-16">
      <v-col>
        <v-sheet class="pa-2 ma-2"> ID: {{ dados.id }} </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2"> Descrição: {{ dados.descricao }} </v-sheet>
      </v-col>

      <v-responsive width="100%"></v-responsive>

      <v-col>
        <v-sheet class="pa-2 ma-2">
          Segmento: {{ dados.tabelas_valores.descricao }}
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="pa-2 ma-2"
          >Sistema:
          {{dados.itens.descricao ? dados.itens.descricao : "N/A" }}</v-sheet
        >
      </v-col>

      <v-col>
        <v-sheet class="pa-2 ma-2"
          >Icone:
          {{ dados.icone_ok }}</v-sheet
        >
      </v-col>
      <v-responsive width="100%"></v-responsive>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dados: {},
      loading: true,
    };
  },
  methods: {
    returnToMainPage() {
      this.$router.push("/home");
    },
    async loadPredios() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/getEquipamentosById/${this.dados.id}`
        );
        this.dados = response.data;
        console.log(this.dados);
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.dados.id = this.$route.query.id;
      this.loadPredios();
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {
    (async () => {
      await this.loadPredios();
    })();
  },
};
</script>
<style scoped>
.data-container {
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
}
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
