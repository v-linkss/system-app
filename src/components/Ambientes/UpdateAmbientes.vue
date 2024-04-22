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
        class="ml-5 mr-5 align-end"
        v-model="predios.predio_area_id"
        :items="areas"
        label="Selecione uma Área"
        item-title="descricao"
        item-value="id"
        :error-messages="predio_area_id.errorMessage.value"
        clearable
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
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/listaTiposAmbientes`
        );
        const responseData = response.data[0].func_json_tiposambientes;
        this.tipos = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async loadAreas() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        predio_token: storedToken.predio_token,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/listaAreasAmbientes`,
          data
        );
        const responseData = response.data[0].func_json_areas;
        this.areas = responseData;
        console.log(this.areas);
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async loadPredioDetails() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/PrediosAmbiente/${this.predios.id}`
        );
        // Preencha os campos com os detalhes carregados
        this.predios.descricao = response.data.descricao;
        this.predios.numero_ocupantes = response.data.numero_ocupantes;
        this.predios.area = response.data.area;
        this.predios.tabvalores_tipo_ambiente_id =
          response.data.tabvalores_tipo_ambiente_id;
        this.predios.predio_area_id = response.data.predio_area_id;
      } catch (error) {
        console.error("Erro ao carregar detalhes do prédio:", error);
      }
    },
    async update() {
      const data = {
        descricao: this.predios.descricao,
        numero_ocupantes: this.predios.numero_ocupantes,
        area: this.predios.area,
        tabvalores_tipo_ambiente_id: this.predios.tabvalores_tipo_ambiente_id,
        predio_area_id: this.predios.predio_area_id,
      };

      try {
        console.log(
          "###################-this.predios.area-####################\n",
          this.predios.area
        );
        const response = await axios.put(
          `${process.env.MANAGEMENT_API_URL}/PrediosAmbiente/${this.predios.id}`,
          data
        );
        this.$router.push("/predios-ambientes/index"); // Redirecione para a página principal ou faça qualquer outra ação desejada

        this.$router.push("/predios-ambientes/index");
        return response;
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true;
      }
    },
  },

  created() {
    if (this.$route.query.id) {
      this.predios.id = this.$route.query.id;
    } else {
      console.log("Erro em carregar dados");
    }
  },
  mounted() {
    this.loadPredioDetails();
    this.loadTipos();
    this.loadAreas();
  },
};
</script>

<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
import { useField } from "vee-validate";

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
