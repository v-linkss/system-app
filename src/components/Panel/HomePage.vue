<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
   <v-progress-circular indeterminate size="64" v-if="loading"></v-progress-circular>
  <div v-else>
    <AppBar />
    <v-container fluid fill-height>
      <v-row class="justify" >
      <v-col
        v-for="equipamento in equipamentoLocalStorage"
        :key="equipamento.token"
        class="mx-auto"
        max-width="350"
        cols="3"
      >
        <v-card max-width="350" hover>
          <v-card-item class="title-card">
            <v-card-title>{{ equipamento.descricao }}</v-card-title>
            <v-card-title>{{ equipamento.ambiente }}</v-card-title>
          </v-card-item>
          <v-img :width="200" height="200">{{ equipamento.icone }}</v-img>
        </v-card>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    equipamentoLocalStorage: null,
    loading:true
  }),
  created(){
    this.carregarEquipamentoLocalStorage();
  },
  mounted() {
    (async () => {
      await this.carregarEquipamentoLocalStorage();
    })();
  },
  methods: {
    async carregarEquipamentoLocalStorage() {
      try {
        await this.$store.dispatch("listarEquipamento");
        const equipamentoSalvo = localStorage.getItem("equipamento");

        if (equipamentoSalvo) {
          const equipamento = JSON.parse(equipamentoSalvo);
          this.equipamentoLocalStorage = equipamento; // Armazena o usuário na variável do componente
          console.log(
            "equipamento carregado do localStorage:",
            this.equipamentoLocalStorage
          );
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
};
</script>

<style scoped>
.justify {
  margin-top: 100px;
  display: flex;
  align-items: center;
}

.title-card {
  background-color: #53b2e2;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-td {
  display: flex;
  align-items: center;
  gap: 15px;
}

.allignButtons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.btn-pointer {
  cursor: pointer;
}
.red-icon {
  color: red;
}

.gray-icon {
  color: gray;
}
</style>
