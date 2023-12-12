<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container1">
    <div class="container">
      <v-img
        class="image"
        :width="250"
        height="180"
        src="../../assets/Logo.png"
      ></v-img>
      <div class="text">Log in</div>
      <v-text-field
        v-model="email"
        class="input"
        density="compact"
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="senha"
        class="input"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn block rounded class="button" v-on:click="login"> Acessar </v-btn>

      <a
        class="text-caption text-decoration-none text-blue"
        href="/esqueci-senha"
        rel="noopener noreferrer"
      >
        Esqueceu a senha?</a
      >
    </div>
    <div class="background-image"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    visible: false,
    email: "",
    senha: "",
  }),

  methods: {
    async login() {
      const data = {
        email: this.email,
        senha: this.senha,
      };
      try {
        const response = await axios.post("http://localhost:3333/login", data);
        console.log(response.data);
        this.$router.push("/panel");
        if (response.status === 404) {
          console.log("Resgistro criado com sucesso",this.email,this.senha);
        }
      } catch (error) {
        console.error(error,this.email,this.senha);
      }
    },
  },
};
</script>
<style scoped>
.input {
  width: 500px;
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
  margin-left: 20px;
  display: flex;
  align-items: center;
  height: 846px;
}

.imageLogin {
  height: 100vh;
  width: 100vh;
  object-fit: cover;
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
.image {
  display: flex;
  margin-left: 120px;
  justify-content: center;
}
</style>
