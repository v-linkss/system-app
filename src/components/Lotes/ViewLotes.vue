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
          <v-sheet class="pa-2 ma-2"> Data: {{ dados.data }} </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2"> Valor: {{ dados.valor }} </v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Cobrar: {{ dados.cobrar ? "Cobrar" : "Devolver" }}
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Observação: {{ dados.observacao }}
          </v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2"> Conta: {{ dados.conta_id }} </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2"> Lote: {{ dados.lote_id }} </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Equipamento: {{ dados.predio_equipamento_id }}
          </v-sheet>
        </v-col>
      </v-row>
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
      this.$router.push("/pi-lotes-receitas/index/");
    },
    async loadLotes() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/ReceitaLotes/${this.dados.id}`
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
    if (this.$route.query.id) {
      this.dados.id = this.$route.query.id;
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
