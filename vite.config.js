import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/", // ensure correct asset URLs in production
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5000,
    open: true,
  },
  preview: {
    port: 4173, // `npm run preview` (matches Vite default)
  },
  build: {
    outDir: "dist", // Vercel serves from this folder
    sourcemap: false,
  },
});
