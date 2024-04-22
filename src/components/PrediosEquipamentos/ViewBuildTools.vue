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
          <v-sheet class="pa-2 ma-2"> ID: {{ dados.id }} </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Descrição: {{ dados.descricao }}
          </v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2"> Codigo: {{ dados.codigo }} </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Patrimonio: {{ dados.patrimonio }}
          </v-sheet>
        </v-col>

        <!-- <v-col>
          <v-sheet class="pa-2 ma-2"
            >Gestor:
            {{
              dados.user_gestor
            }}</v-sheet
          >
        </v-col> -->

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Modelo: {{ dados.equipamentos_modelo.codigo }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Ambiente: {{ dados.predios_ambientes.descricao }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Ano Fabricação: {{ dados.ano_fabricacao }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Data Operação: {{ dados.data_operacao }}
          </v-sheet>
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
      this.$router.push("/predios-equipamentos/index");
    },
    async loadPrediosEquipamentos() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/PrediosEquipamentos/${this.dados.id}`
        );
        this.dados = response.data;
        console.log(this.dados)
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
      this.loadPrediosEquipamentos();
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {
    (async () => {
      await this.loadPrediosEquipamentos();
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
