import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-netlify-redirects',
      closeBundle() {
        // Copiar o arquivo _redirects para o diretório de saída
        copyFileSync('client/src/_redirects', 'dist/_redirects');
      }
    }
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./client/src"),
    },
  },
  root: 'client',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'client/index.html'),
      },
    },
  },
}); 