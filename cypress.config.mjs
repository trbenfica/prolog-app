import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
  },
  env: {
    apiUrl: "https://prologapp.com/prolog/api/v3/",
  },
});
