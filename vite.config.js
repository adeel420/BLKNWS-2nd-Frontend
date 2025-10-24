import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // All requests to /api will be proxied to your Google Apps Script
      "/api": {
        target:
          "https://script.google.com/macros/s/AKfycbwct_KlgLhMqgrTAtGOZuOwYYMUjzoKzAyHpqHbaWx9nI7u7dKDwnntlddqTqBEolZ9nA/exec",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
