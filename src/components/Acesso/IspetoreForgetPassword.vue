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
      <div class="text">Redifinir Senha</div>
      <v-text-field
        v-model="email"
        class="input"
        density="compact"
        placeholder="Email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <v-btn block rounded class="button" @click="recuperarSenha">
        Enviar email
      </v-btn>

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
import axios from "axios";
export default {
  data: () => ({
    visible: false,
    email: "",
  }),
  methods: {
    async recuperarSenha() {
      const data = {
        email: this.email,
      };
      try {
        const response = await axios.post(
          `${process.env.AUTH_API_URL}/recuperarSenha`,
          data
        );
        console.log(response.data);
        if (response.status === 200) {
          window.console.log(
            "Verifique a caixa de E-mail para alterar a senha"
          );
        }
      } catch (error) {
        console.error(error, this.email);
      }
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
