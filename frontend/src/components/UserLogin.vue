<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const res = ref(null);
</script>

<template>
  <h1 class="text-center">Connexion</h1>
  <div class="row justify-content-center mt-5">
    <div class="col-md-4">
      <div class="mb-1">
        <label>Email</label>
        <input
          class="form-control mb-1"
          type="email"
          v-model="email"
          placeholder="email"
          required
        />
      </div>

      <div class="mb-1">
        <label>Email</label>
        <input
          class="form-control mb-1"
          type="password"
          v-model="password"
          placeholder="Mot de passe"
          required
        />
      </div>

      <div v-if="res" class="alert alert-danger my-2">{{ res }}</div>
    </div>
    <div class="row justify-content-center mt-1">
      <div class="col-md-4 text-end">
        <button class="btn btn-success">Connexion</button>
      </div>
    </div>
  </div>
</template>
