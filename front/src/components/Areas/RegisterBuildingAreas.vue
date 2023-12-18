<template>
  <div class="arrow" @click="returnToMainPage">
    <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xl" />
  </div>
  <form>
    <v-text-field
      v-model="predios.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
    ></v-text-field>

    <v-text-field
      v-model.number="predios.numero_ocupantes"
      v-mask="'###'"
      :error-messages="numero_ocupantes.errorMessage.value"
      label="Numero Ocupantes"
    ></v-text-field>

    <v-text-field
      v-mask="'###.##'"
      v-model.number="predios.area"
      :error-messages="area.errorMessage.value"
      label="Área(m2)"
    ></v-text-field>

    <v-autocomplete
      v-model="predios.tabvalores_tipo_ambiente_id"
      :items="tipos"
      :item-title="(tipo) => tipo.descricao"
      :item-value="(tipo) => tipo.id"
      :error-messages="tabvalores_tipo_ambiente_id.errorMessage.value"
      label="Selecione um Tipo"
      @input="filterTipos"
    ></v-autocomplete>

    <v-autocomplete
      v-model="predios.predio_area_id"
      :items="areas"
      label="Selecione uma Área"
      :item-title="(area) => area.descricao"
      :item-value="(area) => area.id"
      :error-messages="predio_area_id.errorMessage.value"
      @input="filterAreas"
    ></v-autocomplete>

    <v-btn class="me-4" @click="submit"> Criar </v-btn>

    <v-btn @click="handleReset"> Limpar </v-btn>
  </form>
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
      tipos: [
        {
          descricao: undefined,
          id: undefined,
        },
      ],
      areas: [
        {
          descricao: undefined,
          id: undefined,
        },
      ], // Inicialize o items como um array vazio
    };
  },

  methods: {
    returnToMainPage() {
      this.$router.push("/home");
    },
    async filterTipos(searchText) {
      try {
        const response = await axios.get("http://localhost:3000/PrediosAreas");
        this.tipos = response.data.filter((tipo) =>
          tipo.descricao.toLowerCase().includes(searchText.toLowerCase())
        );
      } catch (error) {
        console.error("Erro ao carregar áreas de prédio:", error);
      }
    },
    async filterAreas(searchText) {
      try {
        const response = await axios.get("http://localhost:3000/PrediosAreas");
        this.areas = response.data.filter((area) =>
          area.descricao.toLowerCase().includes(searchText.toLowerCase())
        );
      } catch (error) {
        console.error("Erro ao carregar áreas de prédio:", error);
      }
    },
    async loadTipos() {
      try {
        const response = await axios.get("http://localhost:3000/TabValores");
        this.tipos = response.data.map((tipo) => ({
          descricao: tipo.descricao,
          id: tipo.id,
        }));
        console.log(response)
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async loadAreas() {
      try {
        const response = await axios.get("http://localhost:3000/PrediosAreas");
        this.areas = response.data.map((area) => ({
          descricao: area.descricao,
          id: area.id,
        }));
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async submit() {
      const data = {
        descricao: this.predios.descricao,
        numero_ocupantes: this.predios.numero_ocupantes,
        area: this.predios.area,
        tabvalores_tipo_ambiente_id: this.predios.tabvalores_tipo_ambiente_id,
        predio_area_id: this.predios.predio_area_id,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/PrediosAmbiente",
          data
        );
        this.$router.push("/home"); // Redirecione para a página principal ou faça qualquer outra ação desejada
        if (response.status === 200) {
          console.log("Resgistro criado com sucesso");
        }
      } catch (error) {
        console.error("Erro na criação do registro:", error);
        console.log(
          typeof this.predios.predio_area_id,
          typeof this.predios.tabvalores_tipo_ambiente_id
        );
      }
    },
    async handleReset(){
      this.predios.descricao = null;
      this.predios.numero_ocupantes = null;
      this.predios.area = null;
      this.predios.tabvalores_tipo_ambiente_id = null;
      this.predios.predio_area_id = null;
    }
  },
  mounted() {
    this.loadAreas();
    this.loadTipos();
  },
};
</script>
<script setup>
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
