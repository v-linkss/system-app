<!-- ParcelaModal.vue -->
<template>
  <v-dialog v-model="localShow" max-width="1200px" persistent>
    <v-card title="Parcelas">
      <v-card-text class="parcelas-content">
        <v-row dense>
          <v-text-field
            label="Lote"
            :model-value="selectedItem"
            readonly
            class="opacity-75 ml-4"
          ></v-text-field>

          <v-text-field
            label="Valor Títulos"
            :model-value="valorTitulo"
            readonly
            class="opacity-75 ml-4"
          ></v-text-field>
          <v-text-field
            label="Valor Negociado"
            :model-value="valorNegociado"
            readonly
            class="opacity-75 ml-4"
          ></v-text-field>
          <v-text-field
            label="Total Parcelas"
            :model-value="totalParcelas"
            :rules="[maxParcelas]"
            @input="checkParcelas"
            readonly
            class="opacity-75 ml-4"
          ></v-text-field>
          <div class="btn-pointer ml-4" @click="addParcela">
            <img
              style="width: 40px; height: 40px"
              src="../../assets/novo.png"
              alt="novo"
            />
          </div>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <ParcelasGeradas
        :parcelas="parcelasList"
        @remove-parcela="removeParcela"
        @update-parcela="updateParcelaData"
      />
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn style="background-color: red; color: white" @click="closeModal">
          Voltar</v-btn
        >
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              class="me-4"
              v-bind="activatorProps"
              style="background-color: green"
              color="white"
              @click="submit"
            >
              Salvar
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card v-if="showError">
              <v-card-text>
                {{
                  `O valor total das parcelas: ${totalParcelas} deve ser igual ao valor negociado R$ ${this.valorNegociado}`
                }}
              </v-card-text>

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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ParcelasGeradas from "./ParcelasGeradas.vue";
import axios from "axios";
export default {
  components: {
    ParcelasGeradas,
  },
  props: {
    show: {
      Boolean,
      required: true,
    },
    parcelasDetalhadas: {
      type: Array,
      default: () => [],
      required: true,
    },
    taxas: {
      type: Object,
      required: true,
    },
    selectedItem: {
      type: String,
      required: false,
    },
    valorNegociado: {
      type: Number,
      required: false,
    },
    valorTitulo: {
      type: Number,
      required: false,
    },
    titulos: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    totalParcelas() {
      return this.parcelasList.length;
    },
    valorTotalParcelas() {
      return this.parcelasList.reduce((total, parcela) => total + parcela.valor, 0);
    },
  },
  data() {
    return {
      documento: null,
      dt_vencimento: null,
      localShow: this.show,
      parcelasList: JSON.parse(JSON.stringify(this.parcelasDetalhadas)),
      taxasList: JSON.parse(JSON.stringify(this.taxas)),
      showError: false,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    localShow(val) {
      this.$emit("update:show", val);
    },
    parcelasDetalhadas(val) {
      this.parcelasList = JSON.parse(JSON.stringify(val));
    },
    taxas(val) {
      this.taxasList = JSON.parse(JSON.stringify(val));
    },
  },
  methods: {
    closeModal() {
      this.localShow = false;
    },
    updateParcelaData({ index, field, value }) {
      if (
        field === "valor" ||
        field === "tx_multa" ||
        field === "tx_juros" ||
        field === "desconto_adimplencia"
      ) {
        value = Number(value);
      }
      this.parcelasList[index][field] = value;
    },

    addParcela() {
      if (this.parcelasList.length < 12) {
        const novaParcela = {
          documento: "P-" + (this.parcelasList.length + 1),
          valor: 0,
          tx_multa: this.taxasList.tx_multa,
          tx_juros: this.taxasList.tx_juros_mes,
          desconto_adimplencia: this.taxasList.desconto_adimplencia,
        };
        this.parcelasList.push(novaParcela);

      }
    },
    removeParcela(index) {
      if (this.parcelasList.length > 1) {
        this.parcelasList.splice(index, 1);
      }
    },
    maxParcelas(value) {
      if (value >= 12) {
        return "O número máximo de parcelas é 12";
      }
      return true;
    },
    checkParcelas() {
      if (this.parcelasList > 12) {
        this.parcelasList = 12;
      }
    },
    async submit() {
      const storedIdPredio = JSON.parse(localStorage.getItem("predio"));
      const storedIdUser = JSON.parse(localStorage.getItem("user"));
      const data = {
        titulos: this.titulos,
        params: [
          {
            predio_token: storedIdPredio.predio_token,
            user_token: storedIdUser.token,
          },
        ],
        parcelas: this.parcelasList,
      };
      console.log(data);
      if (this.valorTotalParcelas !== this.valorNegociado) {
        this.showError = true;
      } else {
        try {
          const response = await axios.post(
            `${process.env.MANAGEMENT_API_URL}/negociarTitulo`,
            [data]
          );
          const responseData = response.data[0].func_negociacao_titulos;
          console.log(responseData)
          return responseData;
        } catch (error) {
          console.error("Erro na criação do registro:", error);
        }
      }
    },
  },
};
</script>
<style scoped>
.btn-pointer {
  cursor: pointer;
}
</style>
