<template>
  <AppBar />
  <v-container>
    <h1 class="ml-5 mt-5 mb-5" style="color: #777777">Receita dos Lotes</h1>

    <v-text-field
      style="width: 300px"
      class="ml-5 mr-5"
      v-model="pi_lotes_receitas.data"
      :error-messages="data.errorMessage.value"
      type="date"
      label="Data(*)"
      autofocus
    ></v-text-field>

    <v-text-field
      class="ml-5 mr-5"
      v-mask="'#####.##'"
      v-model.number="pi_lotes_receitas.valor"
      :error-messages="valor.errorMessage.value"
      label="Valor(*)"
    ></v-text-field>

    <v-row no-gutters>
      <v-autocomplete
        class="ml-5 mr-5 mb-5"
        v-model="pi_lotes_receitas.conta_id"
        :items="contas"
        label="Selecione uma Conta(*)"
        item-title="descricao"
        item-value="id"
        :error-messages="conta_id.errorMessage.value"
        clearable
      ></v-autocomplete>
      <v-autocomplete
        class="ml-5 mr-5 mb-5"
        v-model="pi_lotes_receitas.lote_id"
        :items="lotes"
        label="Selecione um lote(*)"
        item-title="nome"
        item-value="id"
        :error-messages="lote_id.errorMessage.value"
        clearable
      ></v-autocomplete>
    </v-row>
    <v-row no-gutters>
      <v-autocomplete
        class="ml-5 mr-5 mt-1"
        v-model="pi_lotes_receitas.predio_equipamento_id"
        :items="equipamentos"
        item-title="descricao"
        item-value="id"
        :error-messages="predio_equipamento_id.errorMessage.value"
        label="Selecione um Equipamento"
        clearable
      ></v-autocomplete>

      <v-autocomplete
        class="ml-5 mr-5 mt-1"
        v-model="pi_lotes_receitas.cobrar"
        :items="cobranca"
        item-title="descricao"
        item-value="id"
        :error-messages="cobrar.errorMessage.value"
        label="Cobrar(*)"
        clearable
      ></v-autocomplete>
    </v-row>

    <v-text-field
      class="ml-5 mr-5 mt-5"
      style="height: 100px"
      v-model="pi_lotes_receitas.observacao"
      :error-messages="observacao.errorMessage.value"
      label="Observação"
    ></v-text-field>

    <v-btn class="ml-5 me-4 mt-4" color="red" @click="returnToTableLotes">
      Voltar
    </v-btn>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="me-4 mt-4"
          v-bind="activatorProps"
          color="green"
          @click="submit"
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
      pi_lotes_receitas: {
        data: undefined,
        lote_id: undefined,
        conta_id: undefined,
        valor: undefined,
        predio_equipamento_id: undefined,
        cobrar: undefined,
        observacao: undefined,
      },
      lotes: [],
      contas: [],
      equipamentos: [],
      showError: false,
      cobranca: [
        { id: true, descricao: "COBRAR" },
        { id: false, descricao: "DEVOLVER" },
      ],
    };
  },

  methods: {
    returnToTableLotes() {
      this.$router.push("/pi-lotes-receitas/index/");
    },
    async loadEquipamentos() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/loteEquipamentos`,
          data
        );
        const responseData = response.data[0].func_json_equipamentos_combolist;
        this.equipamentos = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async loadContas() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/contasPredios`,
          data
        );
        const responseData = response.data[0].func_json_contas_predio;
        this.contas = responseData;
        console.log(this.contas);
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async loadLotes() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/lotesPredios`,
          data
        );
        const responseData = response.data[0].func_json_lotes_predio;
        this.lotes = responseData;
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async submit() {
      if (this.pi_lotes_receitas.predio_equipamento_id === undefined) {
        this.pi_lotes_receitas.predio_equipamento_id = null;
      }
      // await checkUndefinedValues();
      const storedIdPredio = JSON.parse(localStorage.getItem("predio"));
      const storedIdUser = JSON.parse(localStorage.getItem("user"));
      const data = {
        cobrar: this.pi_lotes_receitas.cobrar,
        conta_id: this.pi_lotes_receitas.conta_id,
        predio_equipamento_id: this.pi_lotes_receitas.predio_equipamento_id,
        data: this.pi_lotes_receitas.data,
        valor: this.pi_lotes_receitas.valor,
        observacao: this.pi_lotes_receitas.observacao,
        lote_id: this.pi_lotes_receitas.lote_id,
        predio_id: storedIdPredio.predio_id,
        user_created: storedIdUser.id,
      };

      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/createReceitaLotes`,
          data
        );
        this.$router.push("/pi-lotes-receitas/index/");
        return response;
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true;
      }
    },
    async handleReset() {
      this.pi_lotes_receitas.cobrar = null;
      this.pi_lotes_receitas.conta_id = null;
      this.pi_lotes_receitas.predio_equipamento_id = null;
      this.pi_lotes_receitas.data = null;
      this.pi_lotes_receitas.valor = null;
      this.pi_lotes_receitas.observacao = null;
      this.pi_lotes_receitas.lote_id = null;
    },
    async checkUndefinedValues() {
      if (pi_lotes_receitas.predio_equipamento_id === undefined) {
        pi_lotes_receitas.predio_equipamento_id = null;
      }
    },
  },
  mounted() {
    this.loadContas();
    this.loadEquipamentos();
    this.loadLotes();
  },
};
</script>
<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
import { useField } from "vee-validate";

const data = useField("data");
const predio_equipamento_id = useField("predio_equipamento_id");
const cobrar = useField("cobrar");
const lote_id = useField("lote_id");
const observacao = useField("observacao");
const valor = useField("valor");
const conta_id = useField("conta_id");
</script>
<style scoped>
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
