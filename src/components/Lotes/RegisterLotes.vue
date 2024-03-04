<template>
  <AppBar/>
    <form>
      <v-text-field
        v-model="pi_lotes_receitas.data"
        :error-messages="data.errorMessage.value"
        type="date"
        label="Data"
      ></v-text-field>

      <v-autocomplete
        v-model="pi_lotes_receitas.lote_id"
        :items="lotes"
        label="Selecione um lote"
        item-title="nome"
        item-value="id"
        :error-messages="lote_id.errorMessage.value"
      ></v-autocomplete>

      <v-autocomplete
        v-model="pi_lotes_receitas.conta_id"
        :items="contas"
        label="Selecione uma Conta"
        item-title="descricao"
        item-value="id"
        :error-messages="conta_id.errorMessage.value"
      ></v-autocomplete>

      <v-text-field
        v-mask="'#####.##'"
        v-model.number="pi_lotes_receitas.valor"
        :error-messages="valor.errorMessage.value"
        label="Valor"
      ></v-text-field>

      <v-autocomplete
        v-model="pi_lotes_receitas.equipamento_id"
        :items="equipamentos"
        item-title="descricao"
        item-value="id"
        :error-messages="equipamento_id.errorMessage.value"
        label="Selecione um Equipamento"
      ></v-autocomplete>

      <v-autocomplete
        v-model="pi_lotes_receitas.cobrar"
        :items="cobranca"
        item-title="descricao"
        item-value="id"
        :error-messages="cobrar.errorMessage.value"
        label="Cobrar"
      ></v-autocomplete>

      <v-text-field
        v-model="pi_lotes_receitas.observacao"
        :error-messages="observacao.errorMessage.value"
        label="Observação"
      ></v-text-field>

      <v-btn class="me-4" color="green" @click="submit"> Salvar </v-btn>
      <v-btn class="me-4" color="red" @click="returnToTableLotes"> Voltar </v-btn>
      <v-btn @click="handleReset"> Limpar </v-btn>
    </form>
  </template>
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        pi_lotes_receitas: {
          data:undefined,
          lote_id: undefined,
          conta_id: undefined,
          valor: undefined,
          equipamento_id: undefined,
          cobrar: undefined,
          observacao: undefined,
        },
        lotes: [

        ],
        contas: [

        ],
        equipamentos:[

        ],
        cobranca: [
        { id: true, descricao: 'COBRAR' },
        { id: false, descricao: 'DEVOLVER' }
      ],

      };
    },

    methods: {
      returnToTableLotes() {
        this.$router.push("/pi-lotes-receitas/index/");
      },
      async loadEquipamentos() {
        const storedToken = JSON.parse(localStorage.getItem("predio"))
        const data = {
         predio_token:storedToken.predio_token
        }
        try {
          const response = await axios.post(
            `${process.env.MANAGEMENT_API_URL}/loteEquipamentos`,data
          );
          const responseData = response.data[0].func_json_equipamentos_combolist
          this.equipamentos = responseData
        } catch (error) {
          console.error("Erro ao carregar tipos:", error);
        }
      },
      async loadContas() {
        const storedToken = JSON.parse(localStorage.getItem("predio"))
        const data = {
         predio_token:storedToken.predio_token
        }
        try {
          const response = await axios.post(
            `${process.env.MANAGEMENT_API_URL}/contasPredios`,data
          );
          const responseData = response.data[0].func_json_contas_predio
          this.contas = responseData
          console.log(this.contas)
        } catch (error) {
          console.error("Erro ao carregar áreas:", error);
        }
      },
      async loadLotes() {
        const storedToken = JSON.parse(localStorage.getItem("predio"))
        const data = {
         predio_token:storedToken.predio_token
        }
        try {
          const response = await axios.post(
            `${process.env.MANAGEMENT_API_URL}/lotesPredios`,data
          );
          const responseData = response.data[0].func_json_lotes_predio
          this.lotes = responseData
          console.log(this.lotes)
        } catch (error) {
          console.error("Erro ao carregar áreas:", error);
        }
      },
      async submit() {
        const storedIdPredio= JSON.parse(localStorage.getItem("predio"))
        const storedIdUser= JSON.parse(localStorage.getItem("user"))
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
          user_gestor:this.predios_equipamentos.user_gestor,
          predio_id:storedIdPredio.predio_id,
          user_created:storedIdUser.id
        };

        try {
          const response = await axios.post(
            `${process.env.MANAGEMENT_API_URL}/PrediosEquipamentosCadastro`,
            data
          );
          console.log("asdasdas",response.data) // Redirecione para a página principal ou faça qualquer outra ação desejada
          if (response.status === 200) {
            console.log("Resgistro criado com sucesso");
          }
        } catch (error) {
          console.error("Erro na criação do registro:", error);
        }
      },
      async handleReset() {
        this.pi_lotes_receitas.cobrar = null;
        this.pi_lotes_receitas.conta_id = null;
        this.pi_lotes_receitas.equipamento_id = null;
        this.pi_lotes_receitas.data = null;
        this.pi_lotes_receitas.valor = null;
        this.pi_lotes_receitas.observacao = null;
        this.pi_lotes_receitas.lote_id = null;

      },
    },
    mounted() {
      this.loadContas();
      this.loadEquipamentos();
      this.loadLotes();
    },
  };
  </script>
  <script setup>
  import AppBar from "@/layouts/default/AppBar.vue";
  import { useField } from "vee-validate";

  const data = useField("data");
  const equipamento_id = useField("equipamento_id");
  const cobrar = useField("cobrar");
  const lote_id = useField("lote_id");
  const observacao = useField("observacao");
  const valor = useField("valor");
  const conta_id = useField("conta_id");
  </script>
  <style scoped>
  .arrow {
    cursor: pointer;
    margin-bottom: 20px;
  }
  </style>
