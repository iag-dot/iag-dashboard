import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Proxy API requests to the Beehiiv API
      "/api": {
        target: "https://api.beehiiv.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove the /api prefix before forwarding
      },
      // Proxy Google Apps Script requests
      "/sheets-api": {
        target: "https://script.google.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sheets-api/, ""), // Remove /sheets-api prefix
        secure: false, // Allow HTTPS certificates that might be invalid
      },
    },
  },
});
