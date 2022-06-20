<script setup>
import { ref } from "vue";

const email = ref("");
const username = ref("");
const password = ref("");

const res = ref(null);
</script>

<template>
  <h1 class="text-center">Inscription</h1>
  <div class="row justify-content-center">
    <div class="col-md-4">
      <div class="input-group flex-nowrap mb-1">
        <span class="input-group-text">Email</span>
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="email"
        />
      </div>

      <div class="input-group flex-nowrap mb-1">
        <span class="input-group-text">Username</span>
        <input
          type="text"
          class="form-control"
          v-model="username"
          placeholder="Username"
        />
      </div>

      <div class="input-group flex-nowrap mb-1">
        <span class="input-group-text">Password</span>
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
        />
      </div>

      <div v-if="res" class="alert alert-danger my-2">{{ res }}</div>
    </div>
  </div>

  <div class="row justify-content-center mt-1">
    <div class="col-md-4 text-end">
      <button class="btn btn-success">Enregistrer</button>
    </div>
  </div>
</template>
