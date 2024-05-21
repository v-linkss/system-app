
<!-- ParcelaModal.vue -->
<template>
  <v-dialog v-model="localShow" max-width="1200px" persistent>
    <v-card title="Parcelas" >
      <v-card-text  class="parcelas-content">
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
            :model-value="parcelas"
            readonly
            class="opacity-75 ml-4"
          ></v-text-field>
          <div class="btn-pointer ml-4">
            <img
              style="width: 40px; height: 40px"
              src="../../assets/novo.png"
              alt="novo"
            />
          </div>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <ParcelasGeradas :parcelas="parcelas" />
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn style="background-color: red; color: white"  @click="closeModal"> Voltar</v-btn>
        <v-btn style="background-color: green; color: white" text @click="closeModal">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ParcelasGeradas from './ParcelasGeradas.vue'
export default {
  components:{
    ParcelasGeradas
  },
  props: {
    show:{
      Boolean,
      required:true
    },
    selectedItem: {
      type: String,
      required: false,
    },
    valorNegociado: {
      type: Number,
      required: false,
    },
    parcelas: {
      type: Number,
      required: false,
    },
    valorTitulo: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      documento:null,
      dt_vencimento:null,
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    localShow(val) {
      this.$emit("update:show", val);
    },

  },
  methods: {
    closeModal() {
      this.localShow = false;
    },

  },
};
</script>
<style scoped>

.btn-pointer {

  cursor: pointer;
}</style>
