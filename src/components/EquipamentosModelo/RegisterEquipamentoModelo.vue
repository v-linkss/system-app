<template>
  <AppBar />
  <v-container>
    <h1 class="ml-5 mt-5 mb-5" style="color: #777777">Equipamentos Modelo</h1>

    <v-row no-gutters>
      <v-text-field
        class="ml-5 mr-5"
        v-model="modelos.fabricante"
        :error-messages="fabricante.errorMessage.value"
        label="Fabricante"
        dense
        autofocus
      ></v-text-field>

      <v-text-field
        class="ml-5 mr-5"
        v-model="modelos.codigo"
        :error-messages="codigo.errorMessage.value"
        label="Codigo"
      ></v-text-field>
    </v-row>
    <v-row no-gutters>
      <v-autocomplete
        class="ml-5 mr-5 mb-5"
        v-model="modelos.equipamento_tipo_id"
        :items="tipos"
        item-title="descricao"
        item-value="id"
        :error-messages="equipamento_tipo_id.errorMessage.value"
        label="Selecione um Tipo(*)"
        style="max-width: 400px"
        dense
        clearable
      ></v-autocomplete>

      <v-text-field
        class="ml-5 mr-5"
        v-model="modelos.fabricante"
        :error-messages="fabricante.errorMessage.value"
        label="Fabricante"
        dense
      ></v-text-field>
    </v-row>
    <v-text-field
      class="ml-5 mr-5"
      v-model="modelos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
    ></v-text-field>
    <v-row no-gutters>
      <v-text-field
        class="ml-5 mr-5"
        v-model="modelos.codigo"
        :error-messages="codigo.errorMessage.value"
        label="Codigo"
      ></v-text-field>
      <v-text-field
        class="ml-5 mr-5"
        v-mask="'##'"
        v-model.number="modelos.vida_util"
        :error-messages="vida_util.errorMessage.value"
        label="Vida Util(Meses)(*)"
      ></v-text-field>
    </v-row>
    <v-checkbox
      class="ml-5 mr-5"
      v-model="modelos.entra_pmoc"
      :error-messages="entra_pmoc.errorMessage.value"
      label="Incluir no PMOC"
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
      modelos: {
        descricao: undefined,
        codigo: undefined,
        entra_pmoc: undefined,
        fabricante: undefined,
        equipamento_tipo_id: undefined,
        vida_util: undefined,
      },
      showError: false,
      tipos: [],
    };
  },

  methods: {
    returnToMainPage() {
      this.$router.push("/equipamentos-modelos/index");
    },
    async loadTipos() {
      const headers = {
        Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
      };
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        token_predio: storedToken.predio_token,
      };
      console.log("WWWWWWWWWWWWWWWWWWWWW-TEST-WWWWWWWWWWWWWWWWWWW");
      try {
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/listaTiposEquipamentos`,
          data,
          { headers }
        );
        const responseData = response.data[0].func_json_tiposequipamentos;
        this.tipos = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },

    async submit() {
      if (this.modelos.equipamento_tipo_id === undefined) {
        this.modelos.equipamento_tipo_id = null;
      }
      const storedIdPredio = JSON.parse(localStorage.getItem("predio"));
      const storedIdUser = JSON.parse(localStorage.getItem("user"));
      const entra_pmoc = Boolean(this.modelos.entra_pmoc);
      const data = {
        descricao: this.modelos.descricao,
        vida_util: this.modelos.vida_util,
        codigo: this.modelos.codigo,
        fabricante: this.modelos.fabricante,
        equipamento_tipo_id: this.modelos.equipamento_tipo_id,
        entra_pmoc: entra_pmoc,
        predio_id: storedIdPredio.predio_id,
        user_created: storedIdUser.id,
      };

      try {
        const headers = {
          Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
        };
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/service/gerencia/createModeloEquipamentos`,
          data,
          { headers }
        );
        // Redirecione para a página principal ou faça qualquer outra ação desejada

        this.$router.push("/equipamentos-modelos/index");
        return response;
      } catch (error) {
        console.error("Erro na criação do registro:", error);

        this.showError = true;
      }
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    this.loadTipos();
  },
};
</script>
<script setup>
import { useField } from "vee-validate";
import AppBar from "@/layouts/default/AppBar.vue";
const descricao = useField("descricao");
const equipamento_tipo_id = useField("equipamento_tipo_id");
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
