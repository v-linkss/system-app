<script setup></script>
<template>
  <div class="arrow" @click="returnToMainPage">
    <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xl" />
  </div>
  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2"> ID: {{ dados.id }} </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Descrição: {{ dados.descricao }}
          </v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Tipo: {{ dados.tabelas_valores.descricao }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2"
            >Area:
            {{
              dados.predio_area_id ? dados.predios_areas.descricao : "N/A"
            }}</v-sheet
          >
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Predio_id: {{ dados.predio_id }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Numero Ocupantes: {{ dados.numero_ocupantes }}
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
      this.$router.push("/home");
    },
    async loadPredios() {
      try {
        const response = await axios.get(
          `http://localhost:3000/PrediosAmbiente/${this.dados.id}`
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
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
