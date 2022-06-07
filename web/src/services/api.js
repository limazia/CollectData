import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${cookies["collect.token"]}`,
  },
});

export default api;