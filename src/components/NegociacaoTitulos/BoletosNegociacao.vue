<!-- BoletosNegociacao.vue -->
<script setup>
import axios from "axios";
import AppBar from "@/layouts/default/AppBar.vue";
import { ref, onMounted } from "vue";

const dados = ref([]);
const boletos = ref([]);
const loading = ref(true);
const userData = JSON.parse(localStorage.getItem("user"));

const loadLotes = async () => {
  const storedIdPredio = JSON.parse(localStorage.getItem("predio"));
  try {
    const headers = {
      Authorization: `Bearer ${userData.token}`, // Add authorization header with Bearer token
    };
    const response = await axios.get(
      `${process.env.AUTH_API_URL}/service/gerencia/getPrediosTitulosById/${storedIdPredio.predio_id}`,
      { headers }
    );

    boletos.value = response.data;
  } catch (error) {
    console.error("Erro na chamada de API:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const query = JSON.parse(decodeURIComponent(window.location.search.slice(6)));
  if (query) {
    dados.value = query;
  }
  await loadLotes();
});
</script>

<template>
  <LoadingComponent v-if="loading">
    <font-awesome-icon :icon="['fas', 'spinner']" spin />
  </LoadingComponent>
  <div v-else>
    <AppBar />
    <v-container class="data-container mt-16">
      <v-row no-gutters>
        <v-col v-for="(item, index) in dados" :key="index" class="mb-4">
          <v-card>
            <v-card-title>{{ item.documento }}</v-card-title>
            <v-card-text>
              <p><strong>Valor:</strong> {{ item.valor }}</p>
              <p>
                <strong>Data de vencimento:</strong> {{ item.dt_vencimento }}
              </p>
              <p><strong>Numero:</strong> {{ item.numero }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <p>
        <strong>Link Boleto:</strong>
        <a :href="boletos.link_boleto" target="_blank">{{
          boletos.link_boleto ? boletos.link_boleto : ""
        }}</a>
      </p>
    </v-container>
  </div>
</template>

<style scoped>
.data-container {
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px;
}
</style>
