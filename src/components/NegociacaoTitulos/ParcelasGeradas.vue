<template>
  <v-row dense>
    <v-container v-for="(parcela, index) in formattedParcelas" :key="index">
      <v-card>
        <v-col>
          <v-card-text>
            <v-row dense>
              <v-text-field
                v-model="parcela.documento"
                :model-value="parcela.documento"
                :label="'Número '"
                class="ml-4"
                @input="updateParcela(index, 'documento', $event)"
              ></v-text-field>

              <v-text-field
                type="date"
                v-model="parcela.dt_vencimento"
                label="Vencimento"
                class="ml-4"
                style="width: 120px"
                @input="updateParcela(index, 'dt_vencimento', $event)"
              ></v-text-field>

              <v-text-field
                v-model.number="parcela.valor"
                label="Valor "
                class="ml-4"
                style="width: 150px"
                @input="updateParcela(index, 'valor', $event)"
              ></v-text-field>

              <v-text-field
                v-model.number="parcela.tx_multa"
                label="% Multa"
                class="ml-4"
                style="width: 90px"
                @input="updateParcela(index, 'tx_multa', $event)"
              ></v-text-field>

              <v-text-field
                v-model.number="parcela.tx_juros"
                label="% Juros"
                class="ml-4"
                style="width: 85px"
                @input="updateParcela(index, 'tx_juros', $event)"
              ></v-text-field>

              <v-text-field

                v-model.number="parcela.desconto_adimplencia"
                label="Desc. Adimplência"
                class="ml-4"
                style="width: 180px"
                @input="updateParcela(index, 'desconto_adimplencia', $event)"
              ></v-text-field>

              <v-col cols="10">
                <v-text-field
                  v-model="parcela.observacao"
                  type="text"
                  label="Observação"
                  class="ml-3"
                  @input="updateParcela(index, 'observacao', $event)"
                ></v-text-field>
              </v-col>
              <div class="btn-pointer ml-4" @click="removeParcela(index)">
                <img
                  style="width: 40px; height: 40px"
                  src="../../assets/menos.png"
                  alt="subtrair"
                />
              </div>
            </v-row>
          </v-card-text>
        </v-col>
      </v-card>
    </v-container>
  </v-row>
</template>

<script>
export default {
  props: {
    parcelas: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formattedParcelas() {
      return this.parcelas.map(parcela => ({
        ...parcela,
        valor: parcela.valor ? parseFloat(parcela.valor).toFixed(2) : '0.00',
        tx_multa: parcela.tx_multa ? parseFloat(parcela.tx_multa).toFixed(2) : '0.00',
        tx_juros: parcela.tx_juros ? parseFloat(parcela.tx_juros).toFixed(2) : '0.00',
        desconto_adimplencia: parcela.desconto_adimplencia ? parseFloat(parcela.desconto_adimplencia).toFixed(2) : '0.00',
      }));
    },
  },
  methods: {
    removeParcela(index) {
      this.$emit("remove-parcela", index);
    },
    updateParcela(index, field, event) {
      const value = event.target.value;
      let formattedValue = parseFloat(value.replace(',', '.')).toFixed(2);
      if (isNaN(formattedValue)) {
        formattedValue = '0.00';
      }
      this.$emit("update-parcela", { index, field, value: formattedValue });
    },
  },
  watch: {
    parcelas: {
      deep: true,
      handler(newVal) {
        this.$emit("update:parcelas", newVal);
      },
    },
  },
};
</script>

<style scoped>
.btn-pointer {
  cursor: pointer;
}
</style>
