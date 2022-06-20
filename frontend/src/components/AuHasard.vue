<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/services/userStore";
import { useAPI } from "@/services/api";

const { user } = useUserStore();
const { getChaines } = useAPI();

const chaines = ref([]);

async function getData() {
  chaines.value = await getChaines();
}

const rand = computed(() => {
  if (chaines.value.length == 0) {
    return "Rendez-vous sur la page CRUD pour ajouter une chaine";
  } else if (user) {
    let c = chaines.value.filter((chaine) => chaine.user === user.id);
    return c.value[Math.floor(Math.random() * c.value.length)];
  } else if (!user) {
    return chaines.value[Math.floor(Math.random() * chaines.value.length)];
  } else {
    return "";
  }
});

getData();
</script>

<template>
  <div class="row text-center">
    <h1>Au hasard</h1>
    <p>{{ rand }}</p>
  </div>
</template>
