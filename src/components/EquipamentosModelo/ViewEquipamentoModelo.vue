
<template>
  <AppBar/>

  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <v-container class="data-container mt-16">
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2"> Codigo: {{ dados.codigo }} </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Descrição: {{ dados.descricao }}
          </v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-sheet class="pa-2 ma-2">
            Vida Util: {{ dados.vida_util }}
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet class="pa-2 ma-2"
            >Fabricante:
            {{
              dados.fabricante
            }}</v-sheet
          >
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppBar from "@/layouts/default/AppBar.vue";
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
            this.$router.push("/equipamentos-modelos/index");
        },
        async loadPredios() {
            try {
                const response = await axios.get(`${process.env.MANAGEMENT_API_URL}/getModeloEquipamentosById/${this.dados.id}`);
                this.dados = response.data;
                console.log(this.dados)
            }
            catch (error) {
                console.error("Erro na chamada de API:", error);
            }
            finally {
                this.loading = false;
            }
        },
    },
    created() {
        if (this.$route.query.id) {
            this.dados.id = this.$route.query.id;
            this.loadPredios();
        }
        else {
            console.log("Erro em carregar dados");
        }
    },
    mounted() {
        (async () => {
            await this.loadPredios();
        })();
    },
    components: { AppBar }
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
