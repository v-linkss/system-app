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
      <div class="text">Redifinir a Senha</div>
      <v-text-field
        class="input"
        v-model="senha_nova"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Digite a nova senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-text-field
        class="input"
        v-model="senha_redigitada"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Redigite a nova senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn block rounded class="button" @click="verificaSenha"> Salvar Nova Senha </v-btn>

    </div>
    <div class="background-image"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    visible: false,
    senha_nova: "",
    senha_redigitada:""
  }),
  methods: {
    async verificaSenha() {
      if(this.senha_nova === this.senha_redigitada){
        console.log("A senha foi alterada")
      }else{
        console.log("A senha redigitada é diferente da nova senha")
      }
    },
    async recuperarSenha() {
      const data = {
        senha: this.senha_nova,
      };
      try {
        const response = await axios.post(
          "http://localhost:3333/alterarSenha",
          data
        );
        console.log(response.data);
        if (response.status === 200) {
          window.console.log(
            "Verifique a caixa de E-mail para alterar a senha"
          );
        }
      } catch (error) {
        console.error(error);
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

.background-image {
  margin-left: 20px;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/Login.png");
  background-size: cover;
  background-position: center;
  flex: 1;
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
.image {
  display: flex;
  margin-left: 120px;
  justify-content: center;
}
</style>
