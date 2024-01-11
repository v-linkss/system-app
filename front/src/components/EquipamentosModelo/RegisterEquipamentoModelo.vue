<template>
  <AppBar />
  <h1>Modelos</h1>
  <form>
    <v-text-field
      v-model="modelos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
    ></v-text-field>

    <v-text-field
      v-model="modelos.fabricante"
      :error-messages="fabricante.errorMessage.value"
      label="Fabricante"
    ></v-text-field>

    <v-text-field
      v-mask="'##'"
      v-model.number="modelos.vida_util"
      :error-messages="vida_util.errorMessage.value"
      label="Vida Util(Meses)"
    ></v-text-field>

    <v-text-field
      v-model="modelos.codigo"
      :error-messages="codigo.errorMessage.value"
      label="Codigo"
    ></v-text-field>

    <v-autocomplete
      v-model="modelos.equipamento_tipo_id"
      :items="tipos"
      item-title="descricao"
      item-value="id"
      :error-messages="equipamento_tipo_id.errorMessage.value"
      label="Selecione um Tipo"
    ></v-autocomplete>

    <v-checkbox
      v-model="modelos.entra_pmoc"
      :error-messages="entra_pmoc.errorMessage.value"
      label="Incluir no PMOC"
    ></v-checkbox>

    <v-btn class="me-4" color="green" @click="submit"> Salvar </v-btn>
    <v-btn class="me-4" color="red" @click="returnToMainPage"> Voltar </v-btn>
    <v-btn @click="handleReset"> Limpar </v-btn>
  </form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      modelos: {
        descricao: undefined,
        codigo: undefined,
        entra_pmoc: undefined,
        fabricante: undefined,
        equipamento_tipo_id: undefined,
        vida_util: undefined,
      },
      tipos: [],
    };
  },

  methods: {
    returnToMainPage() {
      this.$router.push("/equipamentos-modelos/index");
    },
    async loadTipos() {
      const storedToken = JSON.parse(localStorage.getItem("predio"));
      const data = {
        token_predio: storedToken.predio_token,
      };
      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/listaTiposEquipamentos`,
          data
        );
        const responseData = response.data[0].func_json_tiposequipamentos;
        this.tipos = responseData;
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);

      }
    },

    async submit() {
      const storedIdPredio= JSON.parse(localStorage.getItem("predio"))
      const storedIdUser= JSON.parse(localStorage.getItem("user"))
      const entra_pmoc = Boolean(this.modelos.entra_pmoc);
      const data = {
        descricao: this.modelos.descricao,
        vida_util: this.modelos.vida_util,
        codigo: this.modelos.codigo,
        fabricante: this.modelos.fabricante,
        equipamento_tipo_id: this.modelos.equipamento_tipo_id,
        entra_pmoc:entra_pmoc,
        predio_id:storedIdPredio.predio_id,
        user_created:storedIdUser.id
      };

      try {
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/createModeloEquipamentos`,
          data
        );
        // Redirecione para a página principal ou faça qualquer outra ação desejada
        console.log(data)
        if (response.status === 200) {
          this.$router.push("/equipamentos-modelos/index");
        }
      } catch (error) {
        console.error("Erro na criação do registro:", error);
      }
    },
    async handleReset() {
      this.modelos.descricao = null;
      this.modelos.equipamento_tipo_id = null;
      this.modelos.codigo = null;
      this.modelos.vida_util = null;
      this.modelos.fabricante = null;
      this.modelos.entra_pmoc = null;
    },
  },
  mounted() {
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
