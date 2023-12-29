<!-- combolist -->
<template>
  <v-app-bar color="#1b5175" height="85" class="navBar">
    <div class="logo">
      <v-img :width="200" height="40" src="../../assets/Logo2.png"></v-img>
      <v-autocomplete
        v-if="predios.length > 1"
        density="compact"
        variant="underlined"
        hide-details
        v-model="predioClient"
        :items="transformedPredios"
        :item-text="text"
        :item-value="value"
        @keyup.enter="trocarCliente"
      ></v-autocomplete>
      <h4 v-else>{{ predios[0].text }}</h4>
    </div>
    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Cadastros </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menu, item) in menuSelect.cadastros"
          v-bind:key="item"
          :value="menu.url"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Prestações de Contas</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menu, item) in menuSelect.financeiro"
          :key="item"
          :value="menu.url"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Processos</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menu, item) in menuSelect.relatorios"
          :key="item"
          :value="menu.url"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
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
export default {
  data: () => ({
    selectedItem:null,
    items: [{ title: "Alterar Senha" }, { title: "Sair" }],
  }),
  computed: {
    predios() {
      return this.$store.getters.predios;
    },
    predioClient() {
      return this.$store.getters.prediosState;
    },
    user() {
      return this.$store.getters.user;
    },
    usuario() {
      return this.$store.getters.usuarios;
    },
    nomeUsuario() {
      return this.$store.getters.usuarios.nome;
    },
    menuSelect() {
      return this.$store.getters.menuSelect;
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
    trocarCliente() {
      const selectedPredio = this.predios.find(
        (predio) => predio.value === this.selectedItem
      );

      // Se um registro for encontrado, enviar o predio_token para a rota de listarMenu
      if (selectedPredio) {
        // this.$store.commit("setUser", this.user);
        // this.$store.commit("setPredio", selectedPredio.value);
        // this.$store.dispatch("listarMenu");
        // window.location.reload();
        console.log("Ação executada!",selectedPredio);
      }
    },
    itemClick(title) {
      if (title === "Sair") {
        this.$router.push({ name: "login" }); // Redireciona para a rota 'Sair'
        console.log(this.usuarios);
      }
      if (title === "Alterar Senha") {
        this.$router.push({ name: "recupera-senha" });
      }
    },
  },
};
</script>

<style scoped>
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
