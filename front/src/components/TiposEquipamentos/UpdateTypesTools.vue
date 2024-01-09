<template>
  <AppBar/>
  <form>
    <v-text-field
      v-model="equipamentos_tipos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
    ></v-text-field>

    <v-text-field
      v-model.number="equipamentos_tipos.icone"
      v-mask="'###'"
      :error-messages="icone.errorMessage.value"
      label="icone"
    ></v-text-field>

    <v-autocomplete
      v-model="equipamentos_tipos.tabvalores_segmento_id"
      :items="segmentos"
      :item-title="(tipo) => tipo.descricao"
      :item-value="(tipo) => tipo.id"
      :error-messages="tabvalores_segmento_id.errorMessage.value"
      label="Selecione um Tipo"
    ></v-autocomplete>

    <v-autocomplete
      v-model="equipamentos_tipos.sistema_id"
      :items="sistemas"
      label="Selecione uma Área"
      :item-title="(area) => area.descricao"
      :item-value="(area) => area.id"
      :error-messages="sistema_id.errorMessage.value"
    ></v-autocomplete>

    <v-btn class="me-4" color="green" @click="update"> Alterar </v-btn>
    <v-btn class="me-4" color="red" @click="returnToMainPage"> Voltar </v-btn>

    <v-btn @click="handleReset"> Limpar </v-btn>
  </form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      equipamentos_tipos: {
        descricao: undefined,
        icone: undefined,
        sistema_id: undefined,
        tabvalores_segmento_id: undefined,
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
      this.$router.push("/equipamentos-tipos/index");
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
    async loadPredioDetails() {
    try {
      const response = await axios.get(`http://localhost:3000/PrediosAmbiente/${this.predios.id}`);
      // Preencha os campos com os detalhes carregados
      this.predios.descricao = response.data.descricao;
      this.predios.numero_ocupantes = response.data.numero_ocupantes;
      this.predios.area = response.data.area;
      this.predios.tabvalores_tipo_ambiente_id = response.data.tabvalores_tipo_ambiente_id;
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
      };

      try {
        const response = await axios.put(
          `http://localhost:3000/PrediosAmbiente/${this.predios.id}`,
          data
        );
        this.$router.push("/home"); // Redirecione para a página principal ou faça qualquer outra ação desejada
        if (response.status === 201) {
          console.log("Resgistro criado com sucesso");
          this.$router.push("/home");
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
      this.equipamentos_tipos.descricao = null;
      this.equipamentos_tipos.icone = null;
      this.equipamentos_tipos.tabvalores_segmento_id = null;
      this.equipamentos_tipos.sistema_id = null;
    }
  },

  // created() {
  //   if (this.$route.query.id) {
  //     this.predios.id = this.$route.query.id;
  //   } else {
  //     console.log("Erro em carregar dados");
  //   }
  // },
  // mounted() {
  //   this.loadPredioDetails()
  //   this.loadTipos();
  //   this.loadAreas();
  // },
};
</script>
<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
import { useField } from "vee-validate";

const descricao = useField("descricao");
const sistema_id = useField("sistema_id");
const tabvalores_segmento_id = useField("tabvalores_segmento_id");
const icone = useField("icone");
</script>
<style scoped>
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
