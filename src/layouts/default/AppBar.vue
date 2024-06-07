<!-- combolist -->
<template>
  <v-app-bar color="#1b5175" height="85" class="navBar">
    <div class="logo">
      <v-img :width="200" height="40" src="../../assets/Logo2.png"></v-img>
      <v-autocomplete
        v-if="usuarioLocalStorage.predios.length > 1"
        density="compact"
        variant="underlined"
        :label="predioLocalStorage.predio_descricao"
        hide-details
        v-model="selectedItem"
        :items="comboLocalStorage"
        item-title="predio_descricao"
        item-value="predio_token"
        @update:search="trocarCliente()"
      ></v-autocomplete>
      <h4 v-else>{{ usuarioLocalStorage.predios[0].predio_descricao }}</h4>
    </div>

    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Tela Principal </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menu, item) in menuLocalStorage.Home"
          v-bind:key="item"
          :value="menu.url"
        >
          <router-link class="router-link" :to="`/${menu.url}`">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Cadastros </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menu, item) in menuLocalStorage.Cadastros"
          v-bind:key="item"
          :value="menu.url"
        >
          <router-link class="router-link" :to="`/${menu.url}`">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props"> Financeiro</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menu, item) in menuLocalStorage.Financeiro"
          :key="item"
          :value="menu.url"
        >
          <router-link class="router-link" :to="`/${menu.url}`">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props">Relatórios</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menu, item) in menuLocalStorage.Relatórios"
          :key="item"
          :value="menu.url"
        >
          <router-link class="router-link" :to="`/${menu.url}`">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="text" v-bind="props">Operação</v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(menu, item) in menuLocalStorage.Operação"
          :key="item"
          :value="menu.url"
        >
          <router-link class="router-link" :to="`/${menu.url}`">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="user" v-bind="props"
          >{{ usuarioLocalStorage.nome }}
        </v-btn>
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
        <v-switch
            style="display: flex;padding-left: 10px;"
            inset
            color="info"
            v-model="darkMode"
            @change="toggleTheme()"
            :label="` ${darkMode ? 'Escuro' : 'Claro'}`"
          ></v-switch>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script >
export default {
  data: () => ({
    darkTheme: false,
    usuarioLocalStorage: null,
    menuLocalStorage: null,
    predioLocalStorage: null,
    comboLocalStorage: null,
    selectedItem: null,
    items: [{ title: "Alterar Senha" }, { title: "Sair" }],
  }),

  created() {
    this.carregarUsuarioDoLocalStorage();
    this.carregarMenuDoLocalStorage();
    this.carregarPredioDoLocalStorage();
    this.carregarComboDoLocalStorage();
  },

  methods: {
    trocarCliente() {
      const selectedPredio = this.comboLocalStorage.find(
        (predio) => predio.predio_token === this.selectedItem
      );

      // Se um registro for encontrado, enviar o predio_token para a rota de listarMenu
      if (selectedPredio) {
        this.$store.commit("setUser", this.usuarioLocalStorage);
        this.$store.commit("setPredio", selectedPredio);
        this.$store.dispatch("listarMenu");
        this.$router.go(0);
      }
    },

    itemClick(title) {
      if (title === "Sair") {
        localStorage.clear();
        this.$router.push({ name: "login" }); // Redireciona para a rota 'Sair'
      }
      if (title === "Alterar Senha") {
        this.$router.push({ name: "recupera-senha" });
      }
    },
    carregarUsuarioDoLocalStorage() {
      const usuarioSalvo = localStorage.getItem("user");

      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        this.usuarioLocalStorage = usuario; // Armazena o usuário na variável do componente
      }
    },
    carregarMenuDoLocalStorage() {
      const menuSalvo = localStorage.getItem("menu");

      if (menuSalvo) {
        const menu = JSON.parse(menuSalvo);
        this.menuLocalStorage = menu; // Armazena o usuário na variável do componente
      }
    },
    carregarPredioDoLocalStorage() {
      const predioSalvo = localStorage.getItem("predio");

      if (predioSalvo) {
        const predio = JSON.parse(predioSalvo);
        this.predioLocalStorage = predio; // Armazena o usuário na variável do componente
      }
    },
    carregarComboDoLocalStorage() {
      const comboSalvo = localStorage.getItem("combo");

      if (comboSalvo) {
        const combo = JSON.parse(comboSalvo);

        this.comboLocalStorage = combo;
      }
    },
  },
};
</script>

<script setup >
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const darkMode = ref(false);

// Função para salvar o tema no localStorage
const saveThemeToLocalStorage = (isDark) => {
  localStorage.setItem("darkMode", isDark ? "dark" : "light");
};

// Recuperar o tema do localStorage quando a aplicação for montada
onMounted(() => {
  const savedTheme = localStorage.getItem("darkMode");
  darkMode.value = savedTheme === "dark";
  theme.global.name.value = darkMode.value ? "dark" : "light";
});

const toggleTheme = () => {
  theme.global.name.value = darkMode.value ? "dark" : "light";
  saveThemeToLocalStorage(darkMode.value);
};
</script>

<style scoped>
.router-link {
  text-decoration: none; /* Remove o sublinhado */
  color: inherit; /* Usa a cor do texto padrão (não altera a cor) */
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
