<template>
  <AppBar />
  <h1 class="mt-5 mb-5" style="color: #777777">Predios Equipamentos</h1>

  <v-text-field
    class="ml-5 mr-5"
    v-model="predios_equipamentos.descricao"
    :error-messages="descricao.errorMessage.value"
    label="Descrição"
  ></v-text-field>

  <v-row no-gutters>
    <v-autocomplete
      class="ml-5 mr-5"
      v-model="predios_equipamentos.modelo_id"
      :items="modelos"
      item-title="descricao"
      item-value="id"
      :error-messages="modelo_id.errorMessage.value"
      label="Selecione um Modelo"
    ></v-autocomplete>

    <v-autocomplete
      class="ml-5 mr-5"
      v-model="predios_equipamentos.predio_ambiente_id"
      :items="ambientes"
      item-title="descricao"
      item-value="id"
      :error-messages="predio_ambiente_id.errorMessage.value"
      label="Selecione um Ambiente"
    ></v-autocomplete>
  </v-row>

  <v-row no-gutters>
    <v-text-field
      class="ml-5 mr-5 mt-5"
      v-model="predios_equipamentos.codigo"
      :error-messages="codigo.errorMessage.value"
      label="Codigo"
    ></v-text-field>

    <v-text-field
      class="ml-5 mr-5 mt-5"
      v-mask="'#####.##'"
      v-model.number="predios_equipamentos.vlr_compra"
      :error-messages="vlr_compra.errorMessage.value"
      label="Valor de compra"
    ></v-text-field>

    <v-text-field
      class="ml-5 mr-5 mt-5"
      v-model.number="predios_equipamentos.data_operacao"
      v-mask="'####'"
      :error-messages="data_operacao.errorMessage.value"
      label="Inicio Operação"
    ></v-text-field>
  </v-row>

  <v-row no-gutters>
    <v-text-field
      class="ml-5 mr-5"
      v-model="predios_equipamentos.patrimonio"
      :error-messages="patrimonio.errorMessage.value"
      label="Numero Patrimonio"
    ></v-text-field>

    <v-text-field
      class="ml-5 mr-5"
      v-mask="'#####'"
      v-model.number="predios_equipamentos.numero_serie"
      :error-messages="numero_serie.errorMessage.value"
      label="Numero Serie"
    ></v-text-field>

    <v-text-field
      class="ml-5 mr-5"
      v-mask="'####'"
      v-model.number="predios_equipamentos.ano_fabricacao"
      :error-messages="ano_fabricacao.errorMessage.value"
      label="Ano de Fabricação"
    ></v-text-field>
  </v-row>

  <v-row no-gutters>
    <v-text-field
      class="ml-5 mr-5"
      v-model.number="predios_equipamentos.potencia"
      v-mask="'###.##'"
      :error-messages="potencia.errorMessage.value"
      label="Potência"
    ></v-text-field>

    <v-autocomplete
      class="ml-5 mr-5"
      density="compact"
      v-model="predios_equipamentos.user_gestor"
      :items="users"
      label="Selecione um Gestor"
      item-title="nome"
      item-value="id"
      :error-messages="user_gestor.errorMessage.value"
    ></v-autocomplete>
  </v-row>

  <v-btn  class="ml-5 me-4 mt-4" @click="handleReset"> Limpar </v-btn>
  <v-btn class="me-4 mt-4" color="red" @click="returnToTableTools"> Voltar </v-btn>
  <v-btn class="me-4 mt-4" color="green" @click="updatePrediosEquipamento">
    Alterar
  </v-btn>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      predios_equipamentos: {
        descricao: undefined,
        codigo: undefined,
        ano_fabricacao: undefined,
        patrimonio: undefined,
        potencia: undefined,
        vlr_compra: undefined,
        numero_serie: undefined,
        data_operacao: undefined,
        predio_ambiente_id: undefined,
        modelo_id: undefined,
        user_gestor: undefined,
      },
      ambientes: [],
      modelos: [],
      users: [],
    };
  },

  methods: {
    returnToTableTools() {
      this.$router.push("/predios-equipamentos/index");
    },
    async loadAmbientes() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/listaAmbientes`,
          data
        );
        const responseData = response.data[0].func_json_ambientes;
        this.ambientes = responseData;
        console.log(response);
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async loadModelos() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        token_predio: storedToken.predio_token,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/listaModeloEquipamentos`,
          data
        );
        const responseData = response.data[0].func_json_modelos_equipamentos;
        this.modelos = responseData;
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async loadUsers() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/PrediosEquipamentosGestores`,
          data
        );
        const responseData = response.data[0].func_json_gestores;
        this.users = responseData;
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async updatePrediosEquipamento() {
      const data = {
        descricao: this.predios_equipamentos.descricao,
        codigo: this.predios_equipamentos.codigo,
        ano_fabricacao: this.predios_equipamentos.ano_fabricacao,
        patrimonio: this.predios_equipamentos.patrimonio,
        potencia: this.predios_equipamentos.potencia,
        vlr_compra: this.predios_equipamentos.vlr_compra,
        numero_serie: this.predios_equipamentos.numero_serie,
        data_operacao: this.predios_equipamentos.data_operacao,
        modelo_id: this.predios_equipamentos.modelo_id,
        predio_ambiente_id: this.predios_equipamentos.predio_ambiente_id,
        user_gestor: this.predios_equipamentos.user_gestor,
      };

      try {
        const response = await axios.put(
          `${process.env.MANAGEMENT_API_URL}/PrediosEquipamentosAtualizar/${this.predios_equipamentos.id}`,
          data
        );
        console.log(response);
        if (response.status === 201) {
          console.log("Resgistro criado com sucesso");
          this.$router.push("/predios-equipamentos/index");
        }
      } catch (error) {
        console.error("Erro na criação do registro:", error);
        console.log(
          typeof this.predios.predio_area_id,
          typeof this.predios.tabvalores_tipo_ambiente_id
        );
      }
    },
    async loadPredioEquipamentosDetails() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/PrediosEquipamentos/${this.predios_equipamentos.id}`
        );
        // Preencha os campos com os detalhes carregados
        this.predios_equipamentos.descricao = response.data.descricao;
        this.predios_equipamentos.codigo = response.data.codigo;
        this.predios_equipamentos.ano_fabricacao = response.data.ano_fabricacao;
        this.predios_equipamentos.modelo_id = response.data.modelo_id;
        this.predios_equipamentos.numero_serie = response.data.numero_serie;
        this.predios_equipamentos.potencia = response.data.potencia;
        this.predios_equipamentos.vlr_compra = response.data.vlr_compra;
        this.predios_equipamentos.predio_ambiente_id =
          response.data.predio_ambiente_id;
        this.predios_equipamentos.user_gestor = response.data.user_gestor;
        this.predios_equipamentos.data_operacao = response.data.data_operacao;
        this.predios_equipamentos.patrimonio = response.data.patrimonio;
      } catch (error) {
        console.error(
          "Erro ao carregar detalhes do prédio_equipamentos:",
          error
        );
      }
    },
    async handleReset() {
      this.predios_equipamentos.descricao = null;
      this.predios_equipamentos.codigo = null;
      this.predios_equipamentos.ano_fabricacao = null;
      this.predios_equipamentos.patrimonio = null;
      this.predios_equipamentos.potencia = null;
      this.predios_equipamentos.vlr_compra = null;
      this.predios_equipamentos.numero_serie = null;
      this.predios_equipamentos.data_operacao = null;
      this.predios_equipamentos.modelo_id = null;
      this.predios_equipamentos.predio_ambiente_id = null;
      this.predios_equipamentos.user_gestor = null;
    },
  },

  created() {
    if (this.$route.query.id) {
      this.predios_equipamentos.id = this.$route.query.id;
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {
    this.loadModelos();
    this.loadAmbientes();
    this.loadUsers();
    this.loadPredioEquipamentosDetails();
  },
};
</script>
<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
import { useField } from "vee-validate";

const descricao = useField("descricao");
const codigo = useField("codigo");
const ano_fabricacao = useField("ano_fabricacao");
const patrimonio = useField("patrimonio");
const potencia = useField("potencia");
const vlr_compra = useField("vlr_compra");
const numero_serie = useField("numero_serie");
const data_operacao = useField("data_operacao");
const modelo_id = useField("modelo_id");
const predio_ambiente_id = useField("predio_ambiente_id");
const user_gestor = useField("user_gestor");
</script>
<style scoped>
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
