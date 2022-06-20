import { ref } from "vue";

const user = ref(null);

function UserLogin(name, token) {
  user.value = { name: name, token: token };
  localStorage.setItem("user", JSON.stringify(user.value));
}

export function useUserStore() {
  return {
    user,
    UserLogin,
  };
}
