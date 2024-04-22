<template>
  <AppBar />
  <v-container>
    <h1 class="mt-5 mb-5" style="color: #777777">Predios Equipamentos</h1>

    <v-text-field
      class="ml-5 mr-5"
      v-model="predios_equipamentos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
      autofocus
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
        style="max-width: 520px;"
      ></v-autocomplete>

      <v-autocomplete
        class="ml-5 mr-5"
        v-model="predios_equipamentos.predio_ambiente_id"
        :items="ambientes"
        item-title="descricao"
        item-value="id"
        :error-messages="predio_ambiente_id.errorMessage.value"
        label="Selecione um Ambiente"
        style="max-width: 600px;"
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
        class="ml-5 mr-5 mb-5"
        v-model="predios_equipamentos.user_gestor"
        :items="users"
        label="Selecione um Gestor"
        item-title="nome"
        item-value="id"
        :error-messages="user_gestor.errorMessage.value"
        style="max-width: 500px;"
      ></v-autocomplete>
    </v-row>
    <v-btn class="me-4 mt-4" color="red" @click="returnToTableTools">
      Voltar
    </v-btn>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="me-4 mt-4" v-bind="activatorProps" color="green" @click="updatePrediosEquipamento"> Atualizar </v-btn>
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
      showError:false
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

          this.$router.push("/predios-equipamentos/index");
        return response
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true
      }
    },
    async loadPredioEquipamentosDetails() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/getPrediosEquipamentos/${this.predios_equipamentos.id}`
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
