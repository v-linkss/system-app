<!-- ParcelaModal.vue -->
<template>
  <v-dialog v-model="localShow" max-width="1200px" persistent>
    <v-card title="Parcelas">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-text-field label="First name*" required></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              hint="example of helper text only on focus"
              label="Middle name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              hint="example of persistent helper text"
              label="Last name*"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Email*" required></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Password*"
              type="password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Confirm Password*"
              type="password"
              required
            ></v-text-field>
          </v-col>

        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeModal">Fechar</v-btn>
        <v-btn color="primary" text @click="closeModal">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
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
