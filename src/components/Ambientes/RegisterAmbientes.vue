<template>
  <AppBar />
  <v-container>
    <h1 class="ml-5 mt-5 mb-5" style="color: #777777">Ambientes</h1>

    <v-text-field
      class="ml-5 mr-5"
      v-model="predios.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição(*)"
      autofocus
    ></v-text-field>

    <v-row no-gutters>
      <v-autocomplete
        class="ml-5 align-end"
        v-model="predios.tabvalores_tipo_ambiente_id"
        :items="tipos"
        item-title="descricao"
        item-value="id"
        :error-messages="tabvalores_tipo_ambiente_id.errorMessage.value"
        label="Selecione um Tipo"
        clearable
      ></v-autocomplete>

      <v-autocomplete
        class="ml-5 mr-5"
        v-model="predios.predio_area_id"
        :items="areas"
        label="Selecione uma Área"
        item-title="descricao"
        item-value="id"
        :error-messages="predio_area_id.errorMessage.value"
      ></v-autocomplete>
    </v-row>
    <v-row class="mt-5" no-gutters>
      <v-text-field
        class="ml-5"
        v-model.number="predios.numero_ocupantes"
        v-mask="'###'"
        :error-messages="numero_ocupantes.errorMessage.value"
        label="Numero Ocupantes"
      ></v-text-field>

      <v-text-field
        class="ml-5 mr-5"
        v-mask="'###.##'"
        v-model.number="predios.area"
        :error-messages="area.errorMessage.value"
        label="Área(m2)"
      ></v-text-field>
    </v-row>

    <v-btn class="ml-5 me-4 mt-8" color="red" @click="returnToMainPage">
      Voltar
    </v-btn>

    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="me-4 mt-8"
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
      userData: {},
      predios: {
        descricao: undefined,
        numero_ocupantes: undefined,
        area: undefined,
        tabvalores_tipo_ambiente_id: undefined,
        predio_area_id: undefined,
      },
      showError: false,
      tipos: [],
      areas: [], // Inicialize o items como um array vazio
    };
  },

  methods: {
    returnToMainPage() {
      this.$router.push("/predios-ambientes/index");
    },
    async loadTipos() {
      const headers = {
        Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
      };
      try {
        // Retrieve the token from localStorage


        const response = await axios.get(
          `${process.env.AUTH_API_URL}/service/gerencia/listaTiposAmbientes`,
          { headers } // Pass headers object with authorization
        );

        const responseData = response.data[0].func_json_tiposambientes;
        this.tipos = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },


    async loadAreas() {

      const headers = {
        Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
      };

      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };

      try {
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/listaAreasAmbientes`,
          data,
          { headers }
        );

        const responseData = response.data[0].func_json_areas;
        this.areas = responseData;

      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async submit() {
      const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
      if (this.predios.predio_area_id === undefined) {
        this.predios.predio_area_id = null;
      }

      if (this.predios.numero_ocupantes === undefined) {
        this.predios.numero_ocupantes = null;
      }
      const storedIdPredio = JSON.parse(localStorage.getItem("predio"));
      const storedIdUser = JSON.parse(localStorage.getItem("user"));
      const data = {
        descricao: this.predios.descricao,
        numero_ocupantes: this.predios.numero_ocupantes,
        area: this.predios.area,
        tabvalores_tipo_ambiente_id: this.predios.tabvalores_tipo_ambiente_id,
        predio_area_id: this.predios.predio_area_id,
        predio_id: storedIdPredio.predio_id,
        user_created: storedIdUser.id,
      };

      try {
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/PrediosAmbienteCadastro`,
          data, { headers }
        );
        this.$router.push("/predios-ambientes/index"); // Redirecione para a página principal ou faça qualquer outra ação desejada

        return response;
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true;
      }
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.loadAreas();
    this.loadTipos();
  },
};
</script>
<script setup>
import { useField } from "vee-validate";
import AppBar from "@/layouts/default/AppBar.vue";
const descricao = useField("descricao");
const numero_ocupantes = useField("numero_ocupantes");
const area = useField("area");
const tabvalores_tipo_ambiente_id = useField("tabvalores_tipo_ambiente_id");
const predio_area_id = useField("predio_area_id");
</script>
<style scoped>
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
