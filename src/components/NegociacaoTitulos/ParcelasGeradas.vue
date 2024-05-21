<template>
  <v-row dense>
    <v-col v-for="(parcela, index) in parcelas" :key="index" cols="12">
      <v-card>
        <v-col>
          <v-card-text>
            <v-row dense>
              <v-text-field
                :model-value="index + 1"
                :label="'Número '"
                class="opacity-75 ml-4"
              ></v-text-field>

              <v-text-field
                type="date"
                v-model="dt_vencimento"
                label="Vencimento"
                class="opacity-75 ml-4"
                style="width: 120px"
              ></v-text-field>

              <v-text-field
                v-model="valor"
                type="number"
                label="Valor "
                class="opacity-75 ml-4"
                style="width: 150px"
              ></v-text-field>

              <v-text-field
                v-model="tx_multa"
                type="number"
                label="% Multa"
                class="opacity-75 ml-4"
                style="width: 90px"
              ></v-text-field>

              <v-text-field
                v-model="tx_juros"
                type="number"
                label="% Juros"
                class="opacity-75 ml-4"
                style="width: 85px"
              ></v-text-field>

              <v-text-field
                type="number"
                v-model="desconto_adimplencia"
                label="Desc. Adimplência"
                class="opacity-75 ml-4"
                style="width: 180px"
              ></v-text-field>

              <v-col cols="10">
                <v-text-field
                  v-model="observacao"
                  type="number"
                  label="Observação"
                  class="opacity-75 ml-3"
                ></v-text-field>
              </v-col>
              <div class="btn-pointer ml-4">
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    parcelas: {
      type: Number,
      required: true,
    },
  },
};
</script>
