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
          <v-sheet class="pa-2 ma-2">
            Conta:
            {{ dados.pi_contas?.descricao || "Descrição não disponível" }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Quantidade: {{ dados.quantidade }}
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <center>
      <v-btn class="mt-8" color="red" @click="returnToMainPage"> Voltar</v-btn>
    </center>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: {},
      dados: {
        pi_contas: {}, // Ensure pi_contas is always an object
      },
      loading: true,
    };
  },
  methods: {
    returnToMainPage() {
      this.$router.push("/pi-informacoes/index");
    },
    async loadLancamentos() {
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.get(
          `${process.env.AUTH_API_URL}/service/gerencia/getLancamentosById/${this.dados.id}`,
          { headers }
        );
        this.dados = response.data.lancamentos || {};
        if (!this.dados.pi_contas) {
          this.dados.pi_contas = {}; // Ensure pi_contas is always defined
        }
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
    this.userData = JSON.parse(localStorage.getItem("user"));

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
