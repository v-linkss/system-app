<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>
<template>
  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <AppBar />
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
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
      </v-row>
    </v-container>
    <v-text-field
      class="ml-6"
      v-model="dt_vencimento"
      type="date"
      label="Data de vencimento"
    ></v-text-field>
    <v-btn class="me-4" color="red" @click="returnToMainPage"> Voltar </v-btn>
    <v-btn class="me-4" color="green" @click="updateProrrogacao"> Salvar </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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
        const storedIdUser= JSON.parse(localStorage.getItem("user"))
        const data = {
          dt_vencimento: this.dt_vencimento,
          user_alteracao:storedIdUser.id
        };
        const response = await axios.put(
          `${process.env.MANAGEMENT_API_URL}/updatePrediosTitulos/${this.dados.documento}`,
          data
        );
        console.log(response)
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
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
