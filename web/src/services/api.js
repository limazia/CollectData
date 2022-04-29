import axios from "axios";
import { getToken, logout } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //timeout: 5000
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.request.use(async (response) => {
    return response;
  }, (error) => {
    if (error.response)
      if (error.response.status === 401) {
        logout();
        window.location.replace("/login");
      }
  }
);

export default api;