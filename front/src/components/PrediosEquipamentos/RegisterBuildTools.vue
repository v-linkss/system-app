<template>
  <div class="arrow" @click="returnToTableTools">
    <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xl" />
  </div>
  <form>
    <v-text-field
      v-model="predios_equipamentos.descricao"
      :error-messages="descricao.errorMessage.value"
      label="Descrição"
    ></v-text-field>

    <v-text-field
      v-model="predios_equipamentos.codigo"
      :error-messages="codigo.errorMessage.value"
      label="Codigo"
    ></v-text-field>

    <v-text-field
      v-mask="'####'"
      v-model.number="predios_equipamentos.ano_fabricacao"
      :error-messages="ano_fabricacao.errorMessage.value"
      label="Ano de Fabricação"
    ></v-text-field>

    <v-text-field
      v-model="predios_equipamentos.patrimonio"
      :error-messages="patrimonio.errorMessage.value"
      label="Patrimonio"
    ></v-text-field>

    <v-text-field
      v-model.number="predios_equipamentos.potencia"
      v-mask="'###.##'"
      :error-messages="potencia.errorMessage.value"
      label="Potência"
    ></v-text-field>

    <v-text-field
      v-mask="'#####.##'"
      v-model.number="predios_equipamentos.vlr_compra"
      :error-messages="vlr_compra.errorMessage.value"
      label="Valor de compra"
    ></v-text-field>

    <v-text-field
      v-mask="'#####'"
      v-model.number="predios_equipamentos.numero_serie"
      :error-messages="numero_serie.errorMessage.value"
      label="Numero Serie"
    ></v-text-field>

    <v-text-field
      v-model.number="predios_equipamentos.data_operacao"
      v-mask="'####'"
      :error-messages="data_operacao.errorMessage.value"
      label="Data Operação"
    ></v-text-field>

    <v-autocomplete
      v-model="predios_equipamentos.modelo_id"
      :items="modelos"
      :item-title="(modelo) => modelo.descricao"
      :item-value="(modelo) => modelo.id"
      :error-messages="modelo_id.errorMessage.value"
      label="Selecione um Modelo"
      @input="filterModelos"
    ></v-autocomplete>

    <v-autocomplete
      v-model="predios_equipamentos.predio_ambiente_id"
      :items="ambientes"
      :item-title="(ambiente) => ambiente.descricao"
      :item-value="(ambiente) => ambiente.id"
      :error-messages="predio_ambiente_id.errorMessage.value"
      label="Selecione um Ambiente"
      @input="filterAmbientes"
    ></v-autocomplete>

    <v-autocomplete
      v-model="predios_equipamentos.user_gestor"
      :items="users"
      label="Selecione um Gestor"
      :item-title="(item) => item.nome"
      :item-value="(item) => item.id"
      :error-messages="user_gestor.errorMessage.value"
      @input="filterUsers"
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
      predios_equipamentos: {
        descricao:undefined,
        codigo: undefined,
        ano_fabricacao: undefined,
        patrimonio: undefined,
        potencia: undefined,
        vlr_compra: undefined,
        numero_serie: undefined,
        data_operacao: undefined,
        predio_ambiente_id: undefined,
        modelo_id: undefined,
        user_gestor:undefined,
      },
      ambientes: [
        {
          id: undefined,
          descricao: undefined,
        },
      ],
      modelos: [
        {
          id: undefined,
          descricao: undefined,
        },
      ],
      users:[
        {
          id:undefined,
          nome:undefined,
        }
      ]
    };
  },

  methods: {
    returnToTableTools() {
      this.$router.push("/tabletools");
    },
    async filterAmbientes(searchText) {
      try {
        const response = await axios.get(
          "http://localhost:3000/PrediosEquipamentosAmb"
        );
        this.ambientes = response.data.filter((ambientes) =>
          ambientes.descricao.toLowerCase().includes(searchText.toLowerCase())
        );
      } catch (error) {
        console.error("Erro ao carregar áreas de prédio:", error);
      }
    },
    async filterModelos(searchText) {
      try {
        const response = await axios.get(
          "http://localhost:3000/PrediosEquipamentosMod"
        );
        this.modelos = response.data.filter((modelo) =>
          modelo.descricao.toLowerCase().includes(searchText.toLowerCase())
        );
      } catch (error) {
        console.error("Erro ao carregar áreas de prédio:", error);
      }
    },
    async filterUsers(searchText) {
      try {
        const response = await axios.get(
          "http://localhost:3000/PrediosEquipamentosUser"
        );
        this.users = response.data.filter((user) =>
          user.nome.toLowerCase().includes(searchText.toLowerCase())
        );
      } catch (error) {
        console.error("Erro ao carregar áreas de prédio:", error);
      }
    },
    async loadAmbientes() {
      try {
        const response = await axios.get(
          "http://localhost:3000/PrediosEquipamentosAmb"
        );
        this.ambientes = response.data.map((ambiente) => ({
          descricao: ambiente.descricao,
          id: ambiente.id,
        }));
        console.log(response)
      } catch (error) {
        console.error("Erro ao carregar tipos:", error);
      }
    },
    async loadModelos() {
      try {
        const response = await axios.get(
          "http://localhost:3000/PrediosEquipamentosMod"
        );
        this.modelos = response.data.map((modelo) => ({
          descricao: modelo.descricao,
          id: modelo.id,
        }));
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async loadUsers() {
      try {
        const response = await axios.get(
          "http://localhost:3000/PrediosEquipamentosUser"
        );
        this.users = response.data.map((item) => ({
          nome: item.users.nome,
          id: item.users.id,
        }));
        console.log(response)
      } catch (error) {
        console.error("Erro ao carregar áreas:", error);
      }
    },
    async submit() {
      const data = {
        descricao: this.predios_equipamentos.descricao,
        codigo: this.predios_equipamentos.codigo,
        ano_fabricacao: this.predios_equipamentos.ano_fabricacao,
        patrimonio: this.predios_equipamentos.patrimonio,
        potencia: this.predios_equipamentos.potencia,
        vlr_compra: this.predios_equipamentos.vlr_compra,
        numero_serie: this.predios_equipamentos.numero_serie,
        data_operacao: this.predios_equipamentos.data_operacao,
        modelo_id: this.predios_equipamentos.modelo_id,
        predio_ambiente_id: this.predios_equipamentos.predio_ambiente_id,
        user_gestor:this.predios_equipamentos.user_gestor
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/PrediosEquipamentos",
          data
        );
        this.$router.push("/tabletools"); // Redirecione para a página principal ou faça qualquer outra ação desejada
        if (response.status === 200) {
          console.log("Resgistro criado com sucesso",this.predios_equipamentos.user_gestor);
        }
      } catch (error) {
        console.error("Erro na criação do registro:", error);
      }
    },
    async handleReset() {
      this.predios_equipamentos.descricao = null;
      this.predios_equipamentos.codigo = null;
      this.predios_equipamentos.ano_fabricacao = null;
      this.predios_equipamentos.patrimonio = null;
      this.predios_equipamentos.potencia = null;
      this.predios_equipamentos.vlr_compra = null;
      this.predios_equipamentos.numero_serie = null;
      this.predios_equipamentos.data_operacao = null;
      this.predios_equipamentos.modelo_id = null;
      this.predios_equipamentos.predio_ambiente_id = null;
      this.users.user_gestor = null;
    },
  },
  mounted() {
    this.loadModelos();
    this.loadAmbientes();
    this.loadUsers();
  },
};
</script>
<script setup>
import { useField } from "vee-validate";

const descricao = useField("descricao");
const codigo = useField("codigo");
const ano_fabricacao = useField("ano_fabricacao");
const patrimonio = useField("patrimonio");
const potencia = useField("potencia");
const vlr_compra = useField("vlr_compra");
const numero_serie = useField("numero_serie");
const data_operacao = useField("data_operacao");
const modelo_id = useField("modelo_id");
const predio_ambiente_id = useField("predio_ambiente_id");
const user_gestor = useField("user_gestor");
</script>
<style scoped>
.arrow {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
