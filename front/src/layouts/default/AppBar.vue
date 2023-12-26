<template>
  <v-app-bar color="#1b5175" height="85" class="navBar">
    <div class="logo">
      <v-img :width="200" height="40" src="../../assets/Logo2.png"></v-img>
      <v-autocomplete
        label="tipo usuario"
        :items="[
          'California',
          'Colorado',
          'Florida',
          'Georgia',
          'Texas',
          'Wyoming',
        ]"
        density="10"
        variant="outlined"
        hide-details
        class="label-white"
      ></v-autocomplete>
    </div>
    <v-spacer></v-spacer>
    <v-btn class="text" text>Cadastros</v-btn>
    <!-- <v-btn class="text" text @click="listNavBar">test</v-btn> -->
    <v-btn class="text" text>Prestações de Contas</v-btn>
    <v-btn class="text" text>Processo</v-btn>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="user" v-bind="props">{{ nomeUsuario }} </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="itemClick(item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// import axios from "axios";
export default {
  data: () => ({
    items: [{ title: "Alterar Senha" }, { title: "Sair" }],
  }),
  computed: {
    usuarios() {
      return this.$store.getters.usuarios;
    },
    nomeUsuario() {
      return this.usuarios.name;
    },
    menu() {
      return this.$store.getters.menu;
    },
  },
  //   watch: {
  //     usuarios(novoUsuario) {
  //       this.nomeUsuario = novoUsuario.name;
  //       localStorage.setItem("usuario", JSON.stringify(novoUsuario));
  //     },
  //  },
  //  mounted() {
  //     if (this.usuarios.length > 0) {
  //       this.listNavBar();
  //     } else {
  //       let usuarioLocalStorage = localStorage.getItem("usuario");
  //       if (usuarioLocalStorage) {
  //         this.$store.commit("setUser", JSON.parse(usuarioLocalStorage));
  //       }
  //     }
  //  },

  methods: {
    async listNavBar() {},
    itemClick(title) {
      if (title === "Sair") {
        this.$router.push({ name: "login" }); // Redireciona para a rota 'Sair'
        console.log(this.usuarios);
      }
      if (title === "Alterar Senha") {
        console.log(this.usuarios);
        console.log(this.menu);
      }
    },
  },
};
</script>

<style scoped>
.label-white {
  --v-label-text-color: white;
}
.logo {
  margin-top: 18px;
  margin-left: 50px;
}
.user {
  background-color: #ffffff;
  color: #1b5175;
}
.text {
  color: #ffffff;
}
</style>
