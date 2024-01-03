<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>

<template>
  <AppBar />
  <v-container fluid fill-height>
    <v-row class="justify">
      <v-card class="mx-auto" max-width="344" hover>
        <v-card-item class="title-card">
          <v-card-title> Descrição </v-card-title>
          <v-card-title> Ambiente </v-card-title>
        </v-card-item>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
      </v-card>

      <v-card class="mx-auto" max-width="344" hover>
        <v-card-item class="title-card">
          <v-card-title> Descrição </v-card-title>
          <v-card-title> Ambiente </v-card-title>
        </v-card-item>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
      </v-card>

      <v-card class="mx-auto" max-width="344" hover>
        <v-card-item class="title-card">
          <v-card-title> Descrição </v-card-title>
          <v-card-title> Ambiente </v-card-title>
        </v-card-item>

        <v-card-text >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
      </v-card>

      <v-card class="mx-auto" max-width="344" hover>
        <v-card-item class="title-card">
          <v-card-title> Descrição </v-card-title>
          <v-card-title> Ambiente </v-card-title>
        </v-card-item>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.justify {
  margin-top: 100px;
}

.title-card{
  background-color:#53B2E2;
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
