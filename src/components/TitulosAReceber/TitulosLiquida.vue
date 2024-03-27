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
      v-model="data_pagamento"
      type="date"
      label="Data de pagamento"
      @change="calcularValor"
    ></v-text-field>
    <v-text-field v-model="valor" label="Valor"></v-text-field>
    <v-checkbox v-model="imprimir" label="Imprimir recibo" @click="botao"></v-checkbox>
    <v-btn class="me-4" color="red" @click="returnToMainPage"> Voltar </v-btn>
    <v-btn class="me-4" color="green" @click="updateLiquida"> Salvar </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dados: {},
      data_pagamento: null,
      loading: true,
      imprimir: false,
      valor: null,
      acao:"LIQUIDAR"
    };
  },
  methods: {
    returnToMainPage() {
      this.$router.push("/gestao-perimetros/index");
    },
    async updateLiquida() {
      try {
        const storedTokenUser = JSON.parse(localStorage.getItem("user"));
        const data = {
          titulo_token: this.dados.token,
          dt_pagamento: this.data_pagamento,
          vlr_pago: this.valor,
          user_token: storedTokenUser.token,
          acao:this.acao
        };
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/gerarTitulos`,
          data
        );
        console.log(response)
        const tokenTitulo = response.data[0].func_ger_titulos[0].titulo_token
        if (this.imprimir === true) {
          try {
            const data = {
              token_titulo: tokenTitulo,
            };
            const response = await axios.post(
              `${process.env.MANAGEMENT_API_URL}/imprimirRecibo`,
              data
            );
            console.log(response);

            const newTab = window.open();
            newTab.document.write(response.data[0].func_imprime_recibo_titulo);
          } catch (error) {
            console.error("Erro ao executar a função de impressão:", error);
          }
        }
        this.$router.push("/gestao-perimetros/index");
        return response;
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },
    async calcularValor() {
      try {
        const response = await this.valorCalcula();
        // Lógica para lidar com a resposta
        console.log(response);
      } catch (error) {
        console.error("Erro ao calcular valor:", error);
      }
    },
    async valorCalcula() {
      try {
        const data = {
          titulo_token: this.dados.token,
          data: this.data_pagamento,
        };
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/calcularAcrescimo`,
          data
        );
        this.valor = response.data[0].func_calcula_acrescimo_titulo;
        console.log(this.valor);
        return response;
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },
    async botao(){
      console.log(this.imprimir)
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
