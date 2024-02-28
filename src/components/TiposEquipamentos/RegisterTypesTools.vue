<template>
  <AppBar />
  <h1>Tipos Equipamentos</h1>
  <form>
    <v-text-field
      v-model="prediosTipos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
    ></v-text-field>

    <v-text-field
      v-model.number="prediosTipos.icone"
      v-mask="'###'"
      :error-messages="icone.errorMessage.value"
      label="Icone"
    ></v-text-field>

    <v-autocomplete
      v-model="prediosTipos.sistema_id"
      :items="sistemas"
      item-title="descricao"
      item-value="id"
      :error-messages="sistema_id.errorMessage.value"
      label="Selecione um Sistema"
    ></v-autocomplete>

    <v-autocomplete
      v-model="prediosTipos.tabvalores_segmento_id"
      :items="segmentos"
      label="Selecione um segmento"
      item-title="descricao"
      item-value="id"
      :error-messages="tabvalores_segmento_id.errorMessage.value"
    ></v-autocomplete>

    <v-btn class="me-4" color="green" @click="submit"> Criar </v-btn>
    <v-btn class="me-4" color="red" @click="returnToMainPage"> Voltar</v-btn>

    <v-btn @click="handleReset"> Limpar </v-btn>
  </form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      prediosTipos: {
        descricao: undefined,
        sistema_id: undefined,
        tabvalores_segmento_id: undefined,
        icone: undefined,
      },
      segmentos: [],
      sistemas: [],
    };
  },

  methods: {
    returnToMainPage() {
      this.$router.push("/equipamentos-tipos/index");
    },
    async carregarSegmentos() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/listaSegmentos`
        );
        const responseData = response.data[0].func_json_segmentos;
        this.segmentos = responseData;
        console.log("vcxvncxn", this.segmentos);
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },

    async carregarSistemas() {
      try {
        const response = await axios.get(`${process.env.MANAGEMENT_API_URL}/listaSistemas`);
        const responseData = response.data[0].func_json_sistemas;
        this.sistemas = responseData;
        console.log("asdasdas", this.sistemas);
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },
    async submit() {
      const data = {
        descricao: this.prediosTipos.descricao,
        icone: this.prediosTipos.icone,
        sistema_id: this.prediosTipos.sistema_id,
        tabvalores_tipo_ambiente_id:
          this.prediosTipos.tabvalores_tipo_ambiente_id,
      };

      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/PrediosAmbiente`,
          data
        );
        this.$router.push("/home"); // Redirecione para a página principal ou faça qualquer outra ação desejada
        if (response.status === 200) {
          console.log("Resgistro criado com sucesso");
        }
      } catch (error) {
        console.error("Erro na criação do registro:", error);
      }
    },
    async handleReset() {
      this.prediosTipos.descricao = null;
      this.prediosTipos.tabvalores_segmento_id = null;
      this.prediosTipos.sistema_id = null;
      this.prediosTipos.icone = null;
    },
  },
  mounted() {
    this.carregarSegmentos();
    this.carregarSistemas();
  },
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
