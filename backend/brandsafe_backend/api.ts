import axios from "axios";

// The base URL for your Django API.
// It's good practice to use an environment variable for this.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// A function to set the JWT token on the axios instance.
// This will be called after login/signup.
export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;