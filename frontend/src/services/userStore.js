import { ref } from "vue";

const user = ref(null);

function UserLogin(name, token) {
  user.value = { name: name, token: token };
  localStorage.setItem("user", JSON.stringify(user.value));
}

function logout() {
  user.value = null;
  localStorage.removeItem("user");
}

export function useUserStore() {
  return {
    user,
    UserLogin,
    logout,
  };
}