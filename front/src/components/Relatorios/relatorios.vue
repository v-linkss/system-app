<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppBar />
  <v-app>
    <v-container>
      <v-autocomplete
        label="Selecione o Relatório"
        :items="relatoriosLocalStorage"
        item-title="codigo"
        item-value="codigo"
        v-model="selectedRelatorio"
        @keyup.enter="montarPainelFiltros"
        variant="outlined"
      ></v-autocomplete>
      <v-row v-if="parametrosArray.length > 0">
        <h1>Seleções:</h1>
        <v-col
          v-for="(parametro, index) in parametrosArray"
          :key="index"
          cols="12"
          md="6"
        >
          {{ index }} {{ parametro.tipo === 'TABLE' &&
              parametro.dominio !== null &&  comboSelecao.filter(item => item.tipo === 'TABLE').length > 0}} {{ parametro.label }}
          <v-text-field
            v-if="parametro.tipo === 'DATE'"
            v-model="parametro.valor"
            type="date"
            outlined
          ></v-text-field>
          <v-text-field
            v-mask="'####'"
            v-if="parametro.tipo === 'INTEGER'"
            v-model="parametro.valor"
            type="number"
            outlined
          ></v-text-field>
          <v-text-field
            v-mask="'###.##'"
            v-if="parametro.tipo === 'NUMERIC'"
            v-model="parametro.valor"
            type="number"
            outlined
          ></v-text-field>
          <v-text-field
            v-if="parametro.tipo === 'TEXT'"
            v-model="parametro.valor"
            outlined
          ></v-text-field>

          <v-autocomplete
            v-if="parametro.tipo === 'ARRAY'"
            v-model="parametro.valor"
            outlined
          ></v-autocomplete>
          <v-autocomplete
            v-if="
              parametro.tipo === 'TABLE' &&
              comboSelecao[index]?.tipo === 'TABLE'
            "
            :key="index"
            :items="comboSelecao[index]?.resultado[0].func_json_consulta"
            item-title="chave"
            item-value="valor"
            outlined
          ></v-autocomplete>
        </v-col>
        <v-btn class="me-4" color="red"> Gerar Relatorio </v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import axios from "axios";
import AppBar from "@/layouts/default/AppBar.vue";
</script>
<script>
export default {
  data: () => ({
    relatoriosLocalStorage: [],
    selectedRelatorio: null,
    parametrosArray: [],
    comboSelecao: [],
  }),
  created() {
    this.combolistRelatorios();
  },

  methods: {
    async combolistRelatorios() {
      this.$store.dispatch("listarRelatorios");
      const relatorioDados = localStorage.getItem("relatorio");
      const combo = JSON.parse(relatorioDados);
      this.relatoriosLocalStorage = combo;
    },
    async montarPainelFiltros() {
      const relatorio = this.relatoriosLocalStorage.find(
        (item) => item.codigo === this.selectedRelatorio
      );
      if (relatorio) {
        this.parametrosArray = [...relatorio.parametros];
        const response = await axios.post(
          `${process.env.MANAGEMENT_API_URL}/relatoriosQuery`,
          relatorio
        );
        this.comboSelecao = response.data
        console.log(this.parametrosArray)
        console.log(this.comboSelecao)

      } else {
        this.parametrosArray = [];
      }
    },
  },
};
</script>
