import axios from "axios";

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

export function useAPI() {
  return {
    signup,
  };
}
