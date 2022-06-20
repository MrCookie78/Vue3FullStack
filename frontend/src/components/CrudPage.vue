<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/services/userStore";
import { useAPI } from "@/services/api";

const { user } = useUserStore();
const { getChaines } = useAPI();

const chaines = ref([]);
const ajoutChaine = ref("");

const chainesFiltres = computed(() => {
  return chaines.value.filter((chaine) => (chaine.crééePar = user.id));
});

async function getData() {
  chaines.value = await getChaines();
}

getData();
</script>

<template>
  <div class="row text-center">
    <h1>CRUD</h1>
  </div>
  <div class="row my-3">
    <div class="col-md-2">
      <button class="btn btn-success">Ajouter une chaine</button>
    </div>
  </div>
  <div class="row justify-content-center">
    <table class="table" v-show="chainesFiltres.length > 0">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Chaine</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(key, c) in chainesFiltres" :key="c._id">
          <td>{{ key }}</td>
          <td>{{ c.chaine }}</td>
        </tr>
      </tbody>
    </table>
    <p class="text-center" v-show="chainesFiltres.length == 0">
      Vous n'avez ajouté aucune chaine
    </p>
  </div>
</template>
