import axios from "axios";
import { useUserStore } from "@/services/userStore";
const { user, UserLogin } = useUserStore();

axios.interceptors.request.use((config) => {
  if (user.value) config.headers.common["x-auth-token"] = user.value.token;
  return config;
});

async function login(email, password) {
  try {
    const result = await axios.post("http://localhost:5000/login", {
      email: email,
      motdepasse: password,
    });
    if (result.headers["x-auth-token"]) {
      UserLogin(
        result.data.id,
        result.data.username,
        result.headers["x-auth-token"]
      );
      return true;
    } else return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

async function signup(email, username, password) {
  try {
    const result = await axios.post("http://localhost:5000/signup", {
      email: email,
      username: username,
      motdepasse: password,
    });
    return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

async function getChaines() {
  try {
    const result = await axios.get("http://localhost:5000/chaines");
    return result.data;
  } catch (err) {
    return err;
  }
}

export function useAPI() {
  return {
    login,
    signup,
    getChaines,
  };
}
