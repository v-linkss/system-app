<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>
<template>
  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <AppBar />
    <v-container class="data-container mt-16">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2"> Data: {{ dados.data }} </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2"> Valor: {{ dados.valor }} </v-sheet>
        </v-col>


        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2"> Conta: {{ dados.pi_contas.descricao }} </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2"> Quantidade: {{ dados.quantidade }} </v-sheet>
        </v-col>

      </v-row>
    </v-container>
    <center>
      <v-btn class=" mt-8" color="red" @click="returnToMainPage"> Voltar</v-btn>
    </center>
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
      this.$router.push("/pi-informacoes/index");
    },
    async loadLancamentos() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/getLancamentosById/${this.dados.id}`
        );
        this.dados = response.data.lancamentos;

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
      this.loadLancamentos();
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {
    (async () => {
      await this.loadLancamentos();
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
