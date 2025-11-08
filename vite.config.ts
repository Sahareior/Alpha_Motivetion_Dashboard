import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // 👈 allows access from other devices on LAN
    port: 5173,      // optional: can be any available port
  },
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
