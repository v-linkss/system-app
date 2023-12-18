<template>
  <v-app-bar color="#1b5175" height="85" class="navBar">
    <div class="logo">
      <v-img :width="200" height="40" src="../../assets/Logo2.png"></v-img>
      <v-btn class="text" text>Tipo Usuario</v-btn>
    </div>
    <v-spacer></v-spacer>
    <v-btn class="text" text>Cadastros</v-btn>
    <v-btn class="text" text>Prestações de Contas</v-btn>
    <v-btn class="text" text>Processo</v-btn>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="user" v-bind="props"> Cassela </v-btn>
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
    items: [{ title: "Alterar Senha" }, { title: "Sair" }],
  }),

  // return {
  //   drawer: false,
  // };
  methods: {
    navigateTo(route) {
      // Lógica para navegar para a rota desejada
      console.log(`Navegando para ${route}`);
    },
    itemClick(title) {
      if (title === "Sair") {
        this.$router.push({ name: "login" }); // Redireciona para a rota 'Sair'
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
