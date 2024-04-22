<template>
  <AppBar />
  <v-container>
    <h1 class="ml-5 mt-5 mb-5" style="color: #777777">Tipos Equipamentos</h1>

    <v-text-field
      class="ml-5 mr-5"
      v-model="prediosTipos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição(*)"
      autofocus=""
    ></v-text-field>

    <v-row no-gutters>
      <v-autocomplete
        class="ml-5"
        v-model="prediosTipos.sistema_id"
        :items="sistemas"
        item-title="descricao"
        item-value="id"
        :error-messages="sistema_id.errorMessage.value"
        label="Selecione um Sistema(*)"
        clearable=""
      ></v-autocomplete>

      <v-autocomplete
        class="ml-5 mr-5"
        v-model="prediosTipos.tabvalores_segmento_id"
        :items="segmentos"
        label="Selecione um segmento"
        item-title="descricao"
        item-value="id"
        :error-messages="tabvalores_segmento_id.errorMessage.value"
        clearable=""
      ></v-autocomplete>
    </v-row>
    <v-text-field
      class="ml-5 mr-5 mt-5"
      v-model="prediosTipos.icone"
      :error-messages="icone.errorMessage.value"
      label="Icone"
    ></v-text-field>

    <v-btn class="ml-5 me-4 mt-8" color="red" @click="returnToMainPage">
      Voltar</v-btn
    >
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
      prediosTipos: {
        descricao: undefined,
        sistema_id: undefined,
        tabvalores_segmento_id: undefined,
        icone: undefined,
      },
      showError: false,
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
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },

    async carregarSistemas() {
      try {
        const response = await axios.get(
          `${process.env.MANAGEMENT_API_URL}/listaSistemas`
        );
        const responseData = response.data[0].func_json_sistemas;
        this.sistemas = responseData;
      } catch (error) {
        console.error("Erro na chamada de API:", error);
      }
    },
    async submit() {
      if (this.prediosTipos.tabvalores_segmento_id === undefined) {
        this.prediosTipos.tabvalores_segmento_id = null;
      }
      const storedIdUser = JSON.parse(localStorage.getItem("user"));
      const data = {
        descricao: this.prediosTipos.descricao,
        icone: this.prediosTipos.icone,
        sistema_id: this.prediosTipos.sistema_id,
        tabvalores_segmento_id: this.prediosTipos.tabvalores_segmento_id,
        user_created: storedIdUser.id,
      };

      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/createEquipamentos`,
          data
        );
        this.$router.push("/equipamentos-tipos/index");

        return response;
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true;
      }
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
