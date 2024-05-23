<!-- ParcelasGeradas.vue -->
<template>
  <v-row dense>
    <v-container v-for="(parcela, index) in parcelas" :key="index">
      <v-card>
        <v-col>
          <v-card-text>
            <v-row dense>
              <v-text-field
                :model-value=" parcela.numero"
                :label="'Número '"
                class="ml-4"
              ></v-text-field>

              <v-text-field
                type="date"
                v-model="dt_vencimento"
                label="Vencimento"
                class="ml-4"
                style="width: 120px"
              ></v-text-field>

              <v-text-field
                v-model="parcela.valor"
                type="number"
                label="Valor "
                class="ml-4"
                style="width: 150px"
              ></v-text-field>

              <v-text-field
                v-model="tx_multa"
                v-mask="'##.##'"
                type="number"
                label="% Multa"
                class="ml-4"
                style="width: 90px"
              ></v-text-field>

              <v-text-field
                v-model="tx_juros"
                type="number"
                v-mask="'##.##'"
                label="% Juros"
                class="ml-4"
                style="width: 85px"
              ></v-text-field>

              <v-text-field
                type="number"
                v-mask="'##.##'"
                v-model="desconto_adimplencia"
                label="Desc. Adimplência"
                class="ml-4"
                style="width: 180px"
              ></v-text-field>

              <v-col cols="10">
                <v-text-field
                  v-model="observacao"
                  type="number"
                  label="Observação"
                  class="ml-3"
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
  data() {
    return {
      numero: null,
      dt_vencimento: null,
      valor: null,
      tx_multa: null,
      tx_juros: null,
      desconto_adimplencia: null,
      observacao: null,
    };
  },
  props: {
    parcelas: {
      type: Array,
      required: true,

    },
  },
  methods: {
    removeParcela(index) {
      this.$emit("remove-parcela", index);
    },
  },
};
</script>
<style scoped>
.btn-pointer {
  cursor: pointer;
}
</style>
