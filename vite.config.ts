import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 5173,          // choose any free port (default is 5173)
  },

  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
