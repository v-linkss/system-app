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
          {{ parametro.label }}
          <v-text-field
            v-if="parametro.tipo === 'DATE'"
            v-model="parametro.parametro"
            type="date"
            outlined
          ></v-text-field>
          <v-text-field
            v-mask="'####'"
            v-if="parametro.tipo === 'INTEGER'"
            v-model="parametro.parametro"
            type="number"
            outlined
          ></v-text-field>
          <v-text-field
            v-mask="'###.##'"
            v-if="parametro.tipo === 'NUMERIC'"
            v-model="parametro.parametro"
            type="number"
            outlined
          ></v-text-field>
          <v-text-field
            v-if="parametro.tipo === 'TEXT'"
            v-model="parametro.parametro"
            outlined
          ></v-text-field>

          <v-autocomplete
            v-if="parametro.tipo === 'ARRAY'"
            :items="JSON.parse(parametro.dominio)"
            item-title="chave"
            item-value="valor"
            v-model="parametro.parametro"
            outlined
          ></v-autocomplete>
          <v-autocomplete
            v-if="
              parametro.tipo === 'TABLE' &&
              comboSelecao[index]?.tipo === 'TABLE'
            "
            :key="index"
            :items="comboSelecao[index]?.resultado[0].func_json_consulta"
            label="Selecione o item"
            item-title="chave"
            item-value="valor"
            v-model="parametro.parametro"
            outlined
          ></v-autocomplete>
        </v-col>
        <v-btn class="me-4" color="red" @click="gerarRelatorios">
          Gerar Relatorio
        </v-btn>
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
        this.comboSelecao = response.data;
      } else {
        this.parametrosArray = [];
      }
    },
    gerarRelatorios() {
      const relatorio = this.relatoriosLocalStorage.find(
        (item) => item.codigo === this.selectedRelatorio
      );
      const parametros = JSON.parse(JSON.stringify([...relatorio.parametros]));
      console.log(parametros.parametro);

      parametros.forEach((parametro) => {
        // Verificar se o nome do parâmetro é uma chave em parametros_url
        if (
          Object.prototype.hasOwnProperty.call(
            relatorio.parametros_url,
            parametro.parametro
          )
        ) {
          console.log(parametro.valor);
          relatorio.parametros_url[parametro.parametro] = parametro.valor;
        }
      });

      // Exibe o relatório gerado
      console.log(relatorio.parametros_url);

      // Exibe o relatório gerado
    },
  },
};
</script>
