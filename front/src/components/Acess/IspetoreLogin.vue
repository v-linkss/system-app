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
      <v-container v-if="showError">
        <v-alert text="Erro no sistema" type="error">
          <v-spacer></v-spacer>
          <v-btn text="Fechar" @click="showError = false">Fechar</v-btn>
        </v-alert>
      </v-container>
      <v-container v-if="showEmailError">
        <v-alert
          text="Erro na autenticação de login: Email não cadastrado"
          type="error"
        >
          <v-spacer></v-spacer>
          <v-btn text="Fechar" @click="showEmailError = false">Fechar</v-btn>
        </v-alert>
      </v-container>
      <v-container v-if="showPasswordError">
        <v-alert text="Erro na autenticação da senha" type="error">
          <v-spacer></v-spacer>
          <v-btn text="Fechar" @click="showPasswordError = false">Fechar</v-btn>
        </v-alert>
      </v-container>
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
    showError: false,
    showEmailError: false,
    showPasswordError: false, // Adiciona variável para controlar exibição do modal
  }),

  methods: {
    async login() {
      const data = {
        email: this.email,
        senha: this.senha,
      };

      try {
        const response = await axios.post(`${process.env.AUTH_API_URL}/login`, data);

        if (response.status === 200) {
          const responseData = response.data;

          if (
            responseData[0].func_autentica_acesso_v1[0] &&
            responseData[0].func_autentica_acesso_v1[0].status === "OK" &&
            responseData[0].func_autentica_acesso_v1[0].registro &&
            responseData[0].func_autentica_acesso_v1[0].registro.length > 0
          ) {
            const user =
              responseData[0].func_autentica_acesso_v1[0].registro[0];

            if (user.predios && user.predios.length > 1) {
              // Guarde os dados do usuário para serem usados na tela de seleção de clientes
              this.$store.dispatch("setUser", user);
              this.$store.dispatch("setCombo", user.predios);

              this.$router.push({ name: "selecao-predio" });
            } else {
              this.$store.commit("setUser", user);
              this.$store.commit("setPredio", user.predios[0].predio_token);
              this.$store.dispatch("listarMenu");
              this.$store.dispatch("listarEquipamento");
              this.$router.push("/panel");
            }
          } else {
            console.error("Erro de autenticação com usuário");
            console.log(responseData);
            this.showError = true;
          }
        }
      } catch (error) {
        console.error("Erro ao fazer login", error);
        if (error.response && error.response.status === 400) {
          const errorData = error.response.data;

          if (errorData.error === "Erro de autenticação: Usuario Invalido ou Email nao cadastrado") {
            this.showEmailError = true;
          } else if (errorData.error === "Erro de autenticação: Senha inválida") {
            this.showPasswordError = true;
          } else if (errorData.error === "Erro ao autenticar usuário") {
            this.showError = true;
          }
        }
      }
    },
    closeAlert() {
      // Fecha o modal e reseta a variável
      this.showError = false;
      this.showEmailError = false;
      this.showPasswordError = false;
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
