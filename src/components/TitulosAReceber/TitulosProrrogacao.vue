<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>
<template>
  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <AppBar />
    <h1 class="ml-10 mt-5" style="color: #777777">Prorrogar Titulo</h1>
    <v-container class="data-container mt-7 mb-8">
      <v-col>
        <v-sheet class="pa-2 ma-2">
          Lote: {{ dados.pi_lotes.numero }} - {{ dados.pi_lotes.nome }}
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2"> Título: {{ dados.documento }} </v-sheet>
      </v-col>

      <v-responsive width="100%"></v-responsive>

      <v-col>
        <v-sheet class="pa-2 ma-2">
          Nosso Número: {{ dados.nosso_numero }}
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="pa-2 ma-2"> Valor: R$ {{ dados.valor }} </v-sheet>
      </v-col>

      <v-col>
        <v-sheet class="pa-2 ma-2"
          >Vencimento: {{ dados.dt_vencimento }}</v-sheet
        >
      </v-col>

      <v-responsive width="100%"></v-responsive>

      <v-col>
        <v-sheet class="pa-2 ma-2">
          Link do Boleto: {{ dados.link_boleto }}
        </v-sheet>
      </v-col>
    </v-container>
    <v-text-field
      style="width: 400px; margin-left: 170px"
      v-model="dt_vencimento"
      type="date"
      label="Data de vencimento"
    ></v-text-field>
    <v-btn
      class="me-4"
      style="margin-left: 170px"
      color="red"
      @click="returnToMainPage"
    >
      Voltar
    </v-btn>
    <v-btn class="me-4" color="green" @click="updateProrrogacao">
      Salvar
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: {},
      dados: {},
      dt_vencimento: null,
      loading: true,
    };
  },
  methods: {
    returnToMainPage() {
      this.$router.push("/gestao-perimetros/index");
    },
    async updateProrrogacao() {
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const storedIdUser = JSON.parse(localStorage.getItem("user"));
        const data = {
          dt_vencimento: this.dt_vencimento,
          user_alteracao: storedIdUser.id,
        };
        const response = await axios.put(
          `${process.env.AUTH_API_URL}/service/gerencia/updatePrediosTitulos/${this.dados.documento}`,
          data,
          { headers }
        );
        console.log(response);
        this.$router.push("/gestao-perimetros/index");
        return response;
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },
    async loadLotes() {
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.get(
          `${process.env.AUTH_API_URL}/service/gerencia/getPrediosTitulosById/${this.dados.documento}`,
          { headers }
        );
        this.dados = response.data;
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    if (this.$route.query.documento) {
      this.dados.documento = this.$route.query.documento;
      this.loadLotes();
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    this.userData = JSON.parse(localStorage.getItem("user"));

    (async () => {
      await this.loadLotes();
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
