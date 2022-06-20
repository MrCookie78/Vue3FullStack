import { ref } from "vue";

const user = ref(null);

function UserLogin(id, name, token) {
  user.value = { id: id, name: name, token: token };
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
