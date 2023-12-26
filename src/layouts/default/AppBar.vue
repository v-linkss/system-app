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
        density="compact"
        variant="outlined"
        hide-details
        class="label-white"
      ></v-autocomplete>
    </div>
    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Cadastros </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, cadastros1) in Cadastros"
          :key="cadastros1"
          :value="cadastros1"
        >
          <v-list-item-title>{{ item.cadastros }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Prestações de Contas</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in Financeiro" :key="index" :value="index">
          <v-list-item-title>{{ item.financeiro }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Processos</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
// import { mapGetters } from 'vuex';
// import axios from "axios";
export default {
  data: () => ({
    items: [{ title: "Alterar Senha" }, { title: "Sair" }],
    Cadastros: {},
    Financeiro:[],
  }),
  computed: {
    usuarios() {
      return this.$store.getters.usuarios;
    },
    nomeUsuario() {
      return this.usuarios.nome;
    },
    menuSelect() {
      return this.$store.getters.menuSelect;
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
    itemClick(title) {
      if (title === "Sair") {
        this.$router.push({ name: "login" }); // Redireciona para a rota 'Sair'
        console.log(this.usuarios);
      }
      if (title === "Alterar Senha") {
        console.log(this.menuSelect.cadastros);
        console.log("cada", this.Cadastros);
      }
    },
    async loadMenu() {
      const data = this.$store.getters.menuSelect;

      this.Cadastros = data;
      this.Financeiro = data;
    },
  },
  mounted() {
    (async () => {
      await this.loadMenu();
    })();
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
