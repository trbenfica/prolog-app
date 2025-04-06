import axios from "axios";
import { env } from "./config";

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    "x-prolog-api-token": env.VITE_API_SECRET,
    "Content-Type": "application/json",
  },
});

export default api;
