<template>
  <AppBar />
  <v-container>
    <h1 class="ml-5 mt-5 mb-5" style="color: #777777">Lancamentos</h1>

    <v-row no-gutters>
      <v-text-field
        class="ml-5 mr-5"
        v-model="lancamentos.data"
        :error-messages="fabricante.errorMessage.value"
        label="Data"
        type="date"
      ></v-text-field>
    </v-row>

    <v-text-field
      class="ml-5 mr-5"
      v-mask="'##'"
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
        v-model="lancamentos.equipamento_id"
        :items="tipos"
        item-title="descricao"
        item-value="id"
        :error-messages="equipamento_id.errorMessage.value"
        label="Selecione um Equipamento"
        dense
      ></v-autocomplete>
      <v-autocomplete
        class="ml-5 mr-5 mb-5"
        v-model="lancamentos.conta_id"
        :items="contas"
        item-title="descricao"
        item-value="id"
        :error-messages="equipamento_id.errorMessage.value"
        label="Selecione uma Conta"
        dense
      ></v-autocomplete>
      <v-autocomplete
        class="ml-5 mr-5 mb-5"
        v-model="lancamentos.conta_id"
        :items="tipos"
        item-title="descricao"
        item-value="id"
        :error-messages="equipamento_id.errorMessage.value"
        label="Selecione um Ambiente"
        dense
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
      v-model="lancamentos.entra_pmoc"
      :error-messages="entra_pmoc.errorMessage.value"
      label="Recursos Proprios"
    ></v-checkbox>
    <v-btn class="me-4 mt-8" color="red" @click="returnToMainPage"> Voltar </v-btn>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="me-4 mt-8" v-bind="activatorProps" color="green" @click="submit"> Atualizar </v-btn>
      </template>

      <template  v-slot:default="{ isActive }">
        <v-card v-if="showError">
          <v-card-text>
            Ocorreu erro ao atualizar o campo.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn style="background-color: #1b5175; color: white" @click="isActive.value = false">OK</v-btn>
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
      lancamentos: {
        descricao: undefined,
        conta_id: undefined,
        entra_pmoc: undefined,
        ambiente_id: undefined,
        equipamento_id: undefined,
        data: undefined,
        valor: undefined,
        recurcos_proprios: undefined,
        pagador_cpfcnpj: undefined,
        imprimir_boleto:undefined
      },
      showError:false,
      contas: [],
    };
  },

  methods: {
    returnToMainPage() {
      this.$router.push("/pi-lancamentos/index");
    },
    async carregarContasCombolist(){
      const storedId = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_id: storedId.predio_id,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/combolistContas`,
          data
        );
        const responseData = response.data.contas;
        this.contas = responseData
        console.log(responseData)
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async loadPredioModelosDetails() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/getModeloEquipamentosById/${this.lancamentos.id}`
        );
        // Preencha os campos com os detalhes carregados
        this.lancamentos.descricao = response.data.descricao;
        this.lancamentos.codigo = response.data.codigo;
        this.lancamentos.equipamento_tipo_id = response.data.equipamento_tipo_id;
        this.lancamentos.entra_pmoc = response.data.entra_pmoc;
        this.lancamentos.fabricante = response.data.fabricante;
        this.lancamentos.vida_util = response.data.vida_util;
      } catch (error) {
        console.error(
          "Erro ao carregar detalhes do prédio_equipamentos:",
          error
        );
      }
    },
    async submit() {
      const entra_pmoc = Boolean(this.lancamentos.entra_pmoc);
      const data = {
        descricao: this.lancamentos.descricao,
        vida_util: this.lancamentos.vida_util,
        codigo: this.lancamentos.codigo,
        fabricante: this.lancamentos.fabricante,
        equipamento_tipo_id: this.lancamentos.equipamento_tipo_id,
        entra_pmoc: entra_pmoc,
      };

      try {
        const response = await axios.put(
          `${process.env.MANAGEMENT_API_URL}/updateModeloEquipamentos/${this.lancamentos.id}`,
          data
        ); // Redirecione para a página principal ou faça qualquer outra ação desejada

          this.$router.push("/equipamentos-lancamentos/index");
        return response
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.lancamentos.id = this.$route.query.id;
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {

    this.carregarContasCombolist();
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
