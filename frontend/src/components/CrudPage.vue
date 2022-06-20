<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/services/userStore";
import { useAPI } from "@/services/api";

const { user } = useUserStore();
const { getChaines, addChaine, updateChaine } = useAPI();

const chaines = ref([]);
const ajoutChaine = ref("");

const modifchaine = ref({});

const chainesFiltres = computed(() => {
  return chaines.value.filter((chaine) => chaine.user === user.id);
});

async function getData() {
  chaines.value = await getChaines();
}

async function AjouterChaine() {
  await addChaine(ajoutChaine.value);
  getData();
}

function modifierChaine(e) {
  modifchaine.value = JSON.parse(JSON.stringify(e));
}

async function Modifier() {
  await updateChaine(modifchaine.value);
  getData();
}

getData();
</script>

<template>
  <div class="modal" tabindex="-1" id="modalAjout">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter une chaine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            placeholder="chaine à ajouter"
            v-model="ajoutChaine"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button
            type="button"
            class="btn btn-success"
            :disabled="ajoutChaine == ''"
            @click="AjouterChaine()"
            data-bs-dismiss="modal"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" tabindex="-1" id="modalModif">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier une chaine</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            placeholder="chaine à ajouter"
            v-model="modifchaine.chaine"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button
            type="button"
            class="btn btn-success"
            :disabled="modifchaine.chaine == ''"
            @click="Modifier()"
            data-bs-dismiss="modal"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="row text-center">
    <h1>CRUD</h1>
  </div>
  <div class="row my-3">
    <div class="col-md-2">
      <button
        class="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#modalAjout"
      >
        Ajouter une chaine
      </button>
    </div>
  </div>
  <div class="row justify-content-center">
    <table class="table" v-show="chainesFiltres.length > 0">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Chaine</th>
          <th>Modifier</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, key) in chainesFiltres" :key="c._id">
          <td>{{ key + 1 }}</td>
          <td>{{ c.chaine }}</td>
          <td>
            <button
              class="btn btn-info"
              data-bs-toggle="modal"
              data-bs-target="#modalModif"
              @click="modifierChaine(c)"
            >
              Modifier
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="text-center" v-show="chainesFiltres.length == 0">
      Vous n'avez ajouté aucune chaine
    </p>
  </div>
</template>
