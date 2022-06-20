<script setup></script>

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
              :to="{ name: 'crud' }"
              class="nav-link"
              :class="{ active: $route.name == 'crud' }"
            >
              CRUD
            </router-link>
          </li>
        </ul>
        <router-link :to="{ name: 'signup' }" class="btn btn-info me-1">
          Inscription
        </router-link>
        <router-link :to="{ name: 'login' }" class="btn btn-primary">
          Connexion
        </router-link>
      </div>
    </div>
  </nav>
</template>
