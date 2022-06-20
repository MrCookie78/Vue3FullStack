<script setup>
import { useUserStore } from "@/services/userStore";
const { user } = useUserStore();
</script>

<template>
  <div class="row text-center">
    <h1 v-if="user">Welcome {{ user.name }}</h1>
    <h1 v-else>Welcome</h1>
  </div>
</template>
