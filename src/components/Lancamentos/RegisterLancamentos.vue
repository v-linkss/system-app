<template>
  <AppBar />
  <v-container>
    <h1 class="ml-5 mt-5 mb-5" style="color: #777777">Lancamentos</h1>

    <v-row no-gutters>
      <v-text-field
        class="ml-5 mr-5"
        v-model="lancamentos.data"
        :error-messages="fabricante.errorMessage.value"
        label="Data(*)"
        type="date"
        autofocus
      ></v-text-field>
    </v-row>

    <v-text-field
      class="ml-5 mr-5"
      v-mask="'#####.##'"
      v-model.number="lancamentos.valor"
      :error-messages="vida_util.errorMessage.value"
      label="Valor"
    ></v-text-field>

    <v-text-field
      class="ml-5 mr-5"
      v-model="lancamentos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
    ></v-text-field>
    <v-row no-gutters>
      <v-autocomplete
        class="ml-5 mr-5 mb-5"
        v-model="lancamentos.predio_equipamento_id"
        :items="equipamentos"
        item-title="descricao"
        item-value="id"
        :error-messages="equipamento_id.errorMessage.value"
        label="Selecione um Equipamento"
        dense
        clearable
      ></v-autocomplete>
      <v-autocomplete
        class="ml-5 mr-5 mb-5"
        v-model="lancamentos.conta_id"
        :items="contas"
        item-title="descricao"
        item-value="id"
        :error-messages="equipamento_id.errorMessage.value"
        label="Selecione uma Conta(*)"
        dense
        clearable
      ></v-autocomplete>
      <v-autocomplete
        class="ml-5 mr-5 mb-5"
        v-model="lancamentos.predio_ambiente_id"
        :items="ambientes"
        item-title="descricao"
        item-value="id"
        :error-messages="equipamento_id.errorMessage.value"
        label="Selecione um Ambiente"
        dense
        clearable
      ></v-autocomplete>
    </v-row>
    <v-row no-gutters>
      <v-checkbox
        class="ml-5 mr-5"
        v-model="lancamentos.imprimir_boleto"
        :error-messages="entra_pmoc.errorMessage.value"
        label="Imprimir Boleto"
      ></v-checkbox>
      <v-text-field
        class="ml-5 mr-5"
        v-model="lancamentos.pagador_cpfcnpj"
        :disabled="!lancamentos.imprimir_boleto"
        :error-messages="codigo.errorMessage.value"
        label="CPF/CNPJ"
      ></v-text-field>
      <v-text-field
        class="ml-5 mr-5"
        v-model="lancamentos.pagador_nome"
        :disabled="!lancamentos.imprimir_boleto"
        :error-messages="codigo.errorMessage.value"
        label="Pagador"
      ></v-text-field>
    </v-row>

    <v-checkbox
      class="ml-5 mr-5"
      v-model="lancamentos.recursos_proprios"
      :error-messages="codigo.errorMessage.value"
      label="Recursos Proprios"
    ></v-checkbox>

    <v-btn class="me-4 mt-8" color="red" @click="returnToMainPage">
      Voltar
    </v-btn>
    <v-dialog v-model="showError" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="green"
          class="me-4 mt-8"
          @click="submit"
        >
          Salvar
        </v-btn>
      </template>

      <template v-slot:default>
        <v-card>
          <v-card-text> Faltou preencher os campos obrigatórios </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              style="background-color: #1b5175; color: white"
              @click="showError = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: {},
      lancamentos: {
        descricao: undefined,
        conta_id: undefined,
        predio_ambiente_id: undefined,
        predio_equipamento_id: undefined,
        data: undefined,
        valor: undefined,
        recursos_proprios: undefined,
        pagador_cpfcnpj: undefined,
        pagador_nome: undefined,
        imprimir_boleto: undefined,
      },
      showError: false,
      contas: [],
      ambientes: [],
      equipamentos: [],
    };
  },

  methods: {
    returnToMainPage() {
      this.$router.push("/pi-lancamentos/index");
    },
    async carregarEquipamentosCombolist() {
      console.log(this.lancamentos.imprimir_boleto);
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/combolistEquipamentosLance`,
          data,
          { headers }
        );
        // console.log("combolistEquipamentosLance"); Feito

        const responseData = response.data[0].func_json_equipamentos_combolist;
        this.equipamentos = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async carregarAmbientesCombolist() {
      const storedId = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_id: storedId.predio_id,
      };
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };

        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/combolistAmbientes`,
          data,
          { headers }
        );
        // console.log("combolistAmbientes"); FEITO

        const responseData = response.data.ambientes;
        this.ambientes = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async carregarContasCombolist() {
      const storedId = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_id: storedId.predio_id,
      };
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };


        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/combolistContas`,
          data,
          { headers }
        );
        // console.log("combolistContas");Feito

        const responseData = response.data.contas;
        this.contas = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async submit() {
      if (this.lancamentos.predio_equipamento_id === undefined) {
        this.lancamentos.predio_equipamento_id = null;
      }

      if (this.lancamentos.conta_id === undefined) {
        this.lancamentos.conta_id = null;
      }
      if (this.lancamentos.predio_ambiente_id === undefined) {
        this.lancamentos.predio_ambiente_id = null;
      }
      const storedIdPredio = JSON.parse(localStorage.getItem("predio"));
      const storedIdUser = JSON.parse(localStorage.getItem("user"));
      const recursos_proprios = Boolean(this.lancamentos.recursos_proprios);
      const data = {
        descricao: this.lancamentos.descricao,
        valor: this.lancamentos.valor,
        predio_ambiente_id: this.lancamentos.predio_ambiente_id,
        conta_id: this.lancamentos.conta_id,
        predio_equipamento_id: this.lancamentos.predio_equipamento_id,
        data: this.lancamentos.data,
        pagador_cpfcnpj: this.lancamentos.pagador_cpfcnpj,
        pagador_nome: this.lancamentos.pagador_nome,
        predio_id: storedIdPredio.predio_id,
        user_created: storedIdUser.id,
        recursos_proprios: recursos_proprios,
      };
      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/createLancamentos`,
          data,
          { headers }
        );
        console.log("createLancamentos");
        if (this.lancamentos.imprimir_boleto === true) {
          try {
            const data = {
              titulo_token: storedIdPredio.predio_token,
            };
            const imprimir = await axios.post(
              `${process.env.AUTH_API_URL}/service/gerencia/imprimirRecibo`,
              data,
              { headers }
            );
            console.log("imprimirRecibo");

            const newTab = window.open();
            this.$router.push("/pi-lancamentos/index");
            newTab.document.write(imprimir.data[0].func_imprime_recibo_titulo);
          } catch (error) {
            console.error("Erro ao executar a função de impressão:", error);
          }
        }
        this.$router.push("/pi-lancamentos/index");
        return response;
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true;
      }
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.carregarContasCombolist();
    this.carregarEquipamentosCombolist();
    this.carregarAmbientesCombolist();
  },
};
</script>
<script setup>
import { useField } from "vee-validate";
import AppBar from "@/layouts/default/AppBar.vue";
const descricao = useField("descricao");
const equipamento_id = useField("equipamento_id");
const vida_util = useField("vida_util");
const codigo = useField("codigo");
const fabricante = useField("fabricante");
const entra_pmoc = useField("entra_pmoc");
</script>
<style scoped>
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
