<!-- eslint-disable vue/multi-word-component-names -->
<!-- combolist -->
<template>
  <div class="container1">
    <div class="container">
      <v-img
        class="image"
        :width="250"
        height="180"
        src="../../assets/Logo.png"
      ></v-img>
      <v-autocomplete
        label="Acessar Cliente"
        v-model="selectedPredio"
        :items="transformedPredios"
        :item-text="text"
        :item-value="value"
      ></v-autocomplete>
      <v-btn block rounded class="button" @click="login"> Acessar </v-btn>

      <a
        class="text-caption text-decoration-none text-blue"
        href="login"
        rel="noopener noreferrer"
      >
        Retornar ao Login</a
      >
    </div>
    <div class="background-image"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    selectedPredio: null,
    visible: false,
  }),

  methods: {
    async login() {
      const selectedPredio = this.predios.find(
        (predio) => predio.value === this.selectedPredio
      );

      // Se um registro for encontrado, enviar o predio_token para a rota de listarMenu
      if (selectedPredio) {
        this.$store.commit("setPredio", selectedPredio.value);
        this.$store.dispatch("listarMenu");
        this.$router.push("/panel");
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    predios() {
      return this.$store.getters.predios;
    },
    usuarios() {
      return this.$store.getters.usuarios;
    },
    transformedPredios() {
      return this.predios.map((predio) => ({
        title: predio.text,
        value: predio.value,
      }));
    },
    value() {
      return function (item) {
        return item.value;
      };
    },
    text() {
      return function (item) {
        return item.title;
      };
    },
  },
};
</script>
<style scoped>
.input {
  width: 500px;
}
.background-image {
  margin-left: 20px;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/Login.png");
  background-size: cover;
  background-position: center;
  flex: 1;
}
.text {
  font-size: 25px;
  font-family: "calibri";
  color: #1b5175;
  margin-bottom: 30px;
}
.button {
  background-color: #1b5175;
  color: white;
}
.container {
  width: 500px;
}

.container1 {
  display: flex;
  align-items: center;
  height: 846px;
  margin-left: 20px;
}

.imageLogin {
  height: 100vh;
  width: 100vh;
  object-fit: cover;
}
.image {
  display: flex;
  margin-left: 120px;
  justify-content: center;
}
</style>
