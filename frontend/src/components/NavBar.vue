<script setup>
import { useUserStore } from "@/services/userStore";
import router from "@/router";

const { user, logout } = useUserStore();

function logoutUser() {
  logout();
  router.push({ name: "accueil" });
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="{ name: 'accueil' }" class="navbar-brand">
        Accueil
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="{ name: 'apropos' }"
              class="nav-link"
              :class="{ active: $route.name == 'apropos' }"
            >
              A propos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'hasard' }"
              class="nav-link"
              :class="{ active: $route.name == 'hasard' }"
            >
              Au hasard
            </router-link>
          </li>
          <li v-if="user" class="nav-item">
            <router-link
              :to="{ name: 'crud' }"
              class="nav-link"
              :class="{ active: $route.name == 'crud' }"
            >
              CRUD
            </router-link>
          </li>
        </ul>
        <router-link
          v-if="!user"
          :to="{ name: 'signup' }"
          class="btn btn-info me-1"
        >
          Inscription
        </router-link>
        <router-link
          v-if="!user"
          :to="{ name: 'login' }"
          class="btn btn-primary"
        >
          Connexion
        </router-link>

        <button v-if="user" class="btn btn-danger" @click="logoutUser()">
          Deconnexion
        </button>
      </div>
    </div>
  </nav>
</template>
