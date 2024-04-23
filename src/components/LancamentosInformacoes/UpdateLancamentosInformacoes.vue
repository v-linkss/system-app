<template>
  <AppBar />
  <v-container>
    <h1 class="ml-5 mt-5 mb-5" style="color: #777777">
      Lancamentos Informações
    </h1>

    <v-text-field
      class="ml-5 mr-5"
      v-model="lancamentosInformacoes.data"
      :error-messages="fabricante.errorMessage.value"
      label="Data(*)"
      type="date"
      autofocus
    ></v-text-field>
    <v-autocomplete
      class="ml-5 mr-5 mb-5"
      v-model="lancamentosInformacoes.conta_id"
      :items="contas"
      item-title="descricao"
      item-value="id"
      :error-messages="equipamento_id.errorMessage.value"
      label="Selecione uma Conta(*)"
      dense
      clearable=""
    ></v-autocomplete>

    <v-row no-gutters>
      <v-text-field
        class="ml-5 mr-5"
        v-model.number="lancamentosInformacoes.quantidade"
        :error-messages="codigo.errorMessage.value"
        label="Quantidade"
      ></v-text-field>
      <v-text-field
        class="ml-5 mr-5"
        v-model.number="lancamentosInformacoes.valor"
        :error-messages="codigo.errorMessage.value"
        label="Valor(*)"
      ></v-text-field>
    </v-row>

    <v-btn class="me-4 mt-8" color="red" @click="returnToMainPage">
      Voltar
    </v-btn>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="me-4 mt-8"
          v-bind="activatorProps"
          color="green"
          @click="update"
        >
          Salvar
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card v-if="showError">
          <v-card-text> Faltou preencher os campos obrigatorios </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              style="background-color: #1b5175; color: white"
              @click="isActive.value = false"
              >OK</v-btn
            >
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
      lancamentosInformacoes: {
        conta_id: undefined,
        quantidade: undefined,
        data: undefined,
        valor: null,
      },
      showError: false,
      contas: [],
    };
  },

  methods: {
    returnToMainPage() {
      this.$router.push("/pi-informacoes/index");
    },
    async carregarContasCombolist() {
      const storedId = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_id: storedId.predio_id,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/combolistContasInformacoes`,
          data
        );
        const responseData = response.data.contas;
        this.contas = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async loadLancamentosInformacoesDetails() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/getLancamentosInformacoesById/${this.lancamentosInformacoes.id}`
        );
        // Preencha os campos com os detalhes carregados
        this.lancamentosInformacoes.valor = response.data.lancamentos.valor;
        this.lancamentosInformacoes.data = response.data.lancamentos.data;
        this.lancamentosInformacoes.conta_id =
          response.data.lancamentos.conta_id;
        this.lancamentosInformacoes.quantidade =
          response.data.lancamentos.quantidade;
      } catch (error) {
        console.error(
          "Erro ao carregar detalhes do prédio_equipamentos:",
          error
        );
      }
    },
    async update() {
      if (this.lancamentosInformacoes.conta_id === undefined) {
        this.lancamentosInformacoes.conta_id = null;
      }
      const storedIdPredio = JSON.parse(localStorage.getItem("predio"));
      const storedIdUser = JSON.parse(localStorage.getItem("user"));

      const data = {
        valor: this.lancamentosInformacoes.valor,
        quantidade: this.lancamentosInformacoes.quantidade,
        conta_id: this.lancamentosInformacoes.conta_id,
        data: this.lancamentosInformacoes.data,
        predio_id: storedIdPredio.predio_id,
        user_alteracao: storedIdUser.id,
      };
      try {
        const response = await axios.put(
          `${process.env.MANAGEMENT_API_URL}/updateLancamentos/${this.lancamentosInformacoes.id}`,
          data
        );
        this.$router.push("/pi-informacoes/index");
        console.log(response);
        return response;
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true;
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.lancamentosInformacoes.id = this.$route.query.id;
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {
    this.loadLancamentosInformacoesDetails();
    this.carregarContasCombolist();
  },
};
</script>
<script setup>
import { useField } from "vee-validate";
import AppBar from "@/layouts/default/AppBar.vue";

const equipamento_id = useField("equipamento_id");

const codigo = useField("codigo");
const fabricante = useField("fabricante");
</script>
<style scoped>
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
