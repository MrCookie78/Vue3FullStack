import { createWebHistory, createRouter } from "vue-router";

import AccueilPage from "@/components/AccueilPage.vue";
import AproposPage from "@/components/AproposPage.vue";
import CrudPage from "@/components/CrudPage.vue";
import UserLogin from "@/components/UserLogin.vue";
import InscriptionForm from "@/components/InscriptionForm.vue";

import { useUserStore } from "@/services/userStore";
const { user } = useUserStore();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "accueil",
      component: AccueilPage,
    },
    {
      path: "/apropos",
      name: "apropos",
      component: AproposPage,
    },
    {
      path: "/crud",
      name: "crud",
      component: CrudPage,
    },
    {
      path: "/login",
      name: "login",
      component: UserLogin,
      beforeEnter: function () {
        if (user.value) return { name: "accueil" };
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: InscriptionForm,
      beforeEnter: function () {
        if (user.value) return { name: "accueil" };
      },
    },
  ],
});

export default router;
