import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";

import { useUserStore } from "@/services/userStore";
const { user } = useUserStore();

if (localStorage.getItem("user"))
  user.value = JSON.parse(localStorage.getItem("user"));

createApp(App).use(router).mount("#app");
