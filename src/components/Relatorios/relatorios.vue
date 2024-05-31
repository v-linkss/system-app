<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-progress-circular
    class="loading-spinner"
    indeterminate
    size="64"
    v-if="loading"
  ></v-progress-circular>
  <div v-else>
    <AppBar />
    <v-container>
      <v-autocomplete
        label="Selecione o Relatório"
        :items="relatoriosLocalStorage"
        item-title="codigo"
        item-value="codigo"
        v-model="selectedRelatorio"
        @update:search="montarPainelFiltros()"
        variant="outlined"
      ></v-autocomplete>

      <v-progress-circular
        class="loading-spinner"
        indeterminate
        size="64"
        v-if="loading"
      ></v-progress-circular>
      <div v-else>
        <v-container v-if="parametrosArray.length > 0">
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
              :items="JSON.parse(parametro.dominio)"
              item-title="chave"
              item-value="valor"
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
              label="Selecione o item"
              item-title="chave"
              item-value="valor"
              v-model="parametro.valor"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-btn class="me-4" color="red" @click="gerarRelatorios">
            Gerar Relatorio
          </v-btn>
        </v-container>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import axios from "axios";
import AppBar from "@/layouts/default/AppBar.vue";
</script>
<script>
export default {
  data: () => ({
    userData: {},
    relatoriosLocalStorage: [],
    selectedRelatorio: null,
    loading: true,
    parametrosArray: [],
    relatorioLink: [],
    comboSelecao: [],
    previousSelectedRelatorio: null,
  }),
  created() {
    this.combolistRelatorios();
  },

  methods: {
    async onChangeSelectedRelatorio() {
      try {
        if (this.selectedRelatorio !== this.previousSelectedRelatorio) {
          await this.montarPainelFiltros();
          this.previousSelectedRelatorio = this.selectedRelatorio;
        }
      } catch (error) {
        console.error("Erro ao mudar relatório selecionado:", error);
      } finally {
        this.loading = false; // Define loading como false após a conclusão da mudança de relatório
      }
    },

    async combolistRelatorios() {
      try {
        this.$store.dispatch("listarRelatorios");
        const relatorioDados = localStorage.getItem("relatorio");
        const combo = JSON.parse(relatorioDados);
        this.relatoriosLocalStorage = combo;
      } catch (error) {
        console.error("Erro ao listar relatórios:", error);
      } finally {
        this.loading = false; // Define loading como false após a conclusão da busca por relatórios
      }
    },
    async montarPainelFiltros() {
      try {
        const relatorio = this.relatoriosLocalStorage.find(
          (item) => item.codigo === this.selectedRelatorio
        );

        if (relatorio) {
          this.parametrosArray = [...relatorio.parametros];
          this.parametrosArray.forEach((parametro) => {
            parametro.valor = "";
          });

          const user = JSON.parse(localStorage.getItem("user"));
          const predio = JSON.parse(localStorage.getItem("predio"));
          const data = {
            prédioToken: predio.predio_token,
            prédioId: predio.predio_id,
            userToken: user.token,
            userId: user.id,
            parametros: relatorio.parametros,
          };
          const headers = {
            Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
          };
          const response = await axios.post(
            `${process.env.AUTH_API_URL}/service/gerencia/relatorios_query`,
            data,
            { headers } // Pass headers object with authorization
          );
          this.comboSelecao = response.data;
        } else {
          this.parametrosArray = [];
        }
      } catch (error) {
        console.error("Erro ao montar painel de filtros:", error);
      } finally {
        this.loading = false; // Define loading como false após a requisição ser concluída
      }
    },

    async gerarRelatorios() {
      const relatorio = this.relatoriosLocalStorage.find(
        (item) => item.codigo === this.selectedRelatorio
      );
      const predioToken = JSON.parse(
        localStorage.getItem("predio")
      ).predio_token;
      const usuarioToken = JSON.parse(localStorage.getItem("user")).token;
      const parametros = JSON.parse(JSON.stringify(relatorio.parametros));

      parametros.forEach((parametro) => {
        if (relatorio.parametros_url.predio_token === "p_predio_token") {
          relatorio.parametros_url.predio_token = predioToken;
        }
        if (relatorio.parametros_url.usuario_token === "p_usuario_token") {
          relatorio.parametros_url.usuario_token = usuarioToken;
        }
        relatorio.parametros_url[parametro.parametro] = parametro.valor;
      });
      console.log(relatorio.parametros_url);
      const headers = {
        Authorization: `Bearer ${this.userData.token}`, // Add authorization header with Bearer token
      };
      const response = await axios.post(
        `${process.env.AUTH_API_URL}/service/gerencia/gerar_url`,
        relatorio.parametros_url,
        { headers } // Pass headers object with authorization
      );
      this.relatorioLink = response.data;
      window.open(this.relatorioLink, "_blank");
    },
  },
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));
  },
};
</script>
