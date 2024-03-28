<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>
<template>
  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <AppBar />
    <h1 class="ml-10 mt-5 " style="color: #777777">Cancelar Titulo</h1>
    <v-container class="data-container mt-7 mb-8">
      <v-col>
        <v-sheet class="pa-2 ma-2"> Lote: </v-sheet>
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
        <v-sheet class="pa-2 ma-2"> Valor:R$ {{ dados.valor }} </v-sheet>
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

    <v-btn
      class="me-4"
      style="margin-left: 170px"
      color="red"
      @click="returnToMainPage"
    >
      Voltar
    </v-btn>
    <v-dialog v-model="dialog" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="me-4" v-bind="activatorProps" color="green">
          Salvar
        </v-btn>
      </template>

      <v-card
        text="Deseja salvar esta data de cancelamento?"
        title="Confirmação"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false"> Voltar </v-btn>

          <v-btn @click="updateProrrogacao"> Confirmar </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dados: {},
      loading: true,
      dialog: false,
    };
  },
  methods: {
    returnToMainPage() {
      this.$router.push("/gestao-perimetros/index");
    },
    async updateProrrogacao() {
      try {
        const storedIdUser = JSON.parse(localStorage.getItem("user"));
        const data = {
          dt_cancelamento: new Date().toISOString(),
          user_alteracao: storedIdUser.id,
        };
        const response = await axios.put(
          `${process.env.MANAGEMENT_API_URL}/updatePrediosTitulos/${this.dados.documento}`,
          data
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
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/getPrediosTitulosById/${this.dados.documento}`
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
    if (this.$route.query.documento) {
      this.dados.documento = this.$route.query.documento;
      this.loadLotes();
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {
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
</style>
