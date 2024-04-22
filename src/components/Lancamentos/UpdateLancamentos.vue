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
        autofocus
      ></v-text-field>
    </v-row>

    <v-text-field
      class="ml-5 mr-5"
      v-mask="'#####'"
      v-model.number="lancamentos.valor"
      :error-messages="vida_util.errorMessage.value"
      label="Valor"
      :disabled="lancamentos.pagador_nome === null"
    ></v-text-field>

    <v-text-field
      class="ml-5 mr-5"
      v-model="lancamentos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
      :disabled="lancamentos.pagador_nome === null"
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
        :disabled="lancamentos.pagador_nome === null"
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
          Atualizar
        </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card v-if="showError">
          <v-card-text> Ocorreu erro ao atualizar o campo. </v-card-text>

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
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/combolistEquipamentosLance`,
          data
        );
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
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/combolistAmbientes`,
          data
        );
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
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/combolistContas`,
          data
        );
        const responseData = response.data.contas;
        this.contas = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async loadLancamentosDetails() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/getLancamentosById/${this.lancamentos.id}`
        );
        // Preencha os campos com os detalhes carregados
        this.lancamentos.descricao = response.data.lancamentos.descricao;
        this.lancamentos.data = response.data.lancamentos.codigo;
        this.lancamentos.conta_id = response.data.lancamentos.conta_id;
        this.lancamentos.predio_equipamento_id =
          response.data.lancamentos.predio_equipamento_id;
        this.lancamentos.predio_ambiente_id =
          response.data.lancamentos.predio_ambiente_id;
        this.lancamentos.valor = response.data.lancamentos.valor;
        this.lancamentos.pagador_nome = response.data.lancamentos.pagador_nome;
        this.lancamentos.pagador_cpfcnpj =
          response.data.lancamentos.pagador_cpfcnpj;
        this.lancamentos.recursos_proprios =
          response.data.lancamentos.recursos_proprios;
        if (this.lancamentos.pagador_nome === null) {
          this.lancamentos.imprimir_boleto = true;
        }
        console.log(response.data)
      } catch (error) {
        console.error(
          "Erro ao carregar detalhes do prédio_equipamentos:",
          error
        );
      }
    },
    async update() {
      const storedIdUser = JSON.parse(localStorage.getItem("user"))
      const storedIdPredio = JSON.parse(localStorage.getItem("predio"));
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
        user_alteracao:storedIdUser.id,
        recursos_proprios: recursos_proprios,
      };

      try {
        const response = await axios.put(
          `${process.env.MANAGEMENT_API_URL}/updateLancamentos/${this.lancamentos.id}`,
          data
        ); // Redirecione para a página principal ou faça qualquer outra ação desejada

        this.$router.push("/pi-lancamentos/index");
        return response;
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true;
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
    this.loadLancamentosDetails();
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
