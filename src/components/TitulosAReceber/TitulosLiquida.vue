<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>
<template>
  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <h1 class="ml-10 mt-5 " style="color: #777777">Liquidar Titulo</h1>
    <AppBar />
    <v-container class="data-container mt-7 mb-8">
        <v-col>
          <v-sheet class="pa-2 ma-2"> Lote: {{dados.pi_lotes.numero  }} - {{dados.pi_lotes.nome  }}</v-sheet>
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
    <v-row no-gutters class="justify-center align-center">
      <v-text-field
        style="width: 10px; margin-left: 170px"
        v-model="data_pagamento"
        type="date"
        label="Data de pagamento"
        @change="calcularValor"
      ></v-text-field>
      <v-text-field v-model="valor" class="ml-5" label="Valor"></v-text-field>
      <v-checkbox
        v-model="imprimir"
        class="ml-5"
        label="Imprimir recibo"
        @click="botao"
      ></v-checkbox>
    </v-row>

    <v-btn class="me-4" style=" margin-left: 170px" color="red" @click="returnToMainPage"> Voltar </v-btn>
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
      acao: "LIQUIDAR",
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
          acao: this.acao,
        };
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/gerarTitulos`,
          data
        );
        console.log(response);
        const tokenTitulo = response.data[0].func_ger_titulos[0].titulo_token;
        if (this.imprimir === true) {
          try {
            const data = {
              titulo_token: tokenTitulo,
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
        const acrescimo = response.data[0].func_calcula_acrescimo_titulo;
        this.valor = parseFloat(this.dados.valor) + parseFloat(acrescimo);
        console.log(this.valor);
        return response;
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },
    async botao() {
      console.log(this.imprimir);
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
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
