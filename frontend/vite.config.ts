import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
    },
    port: 8000,
    strictPort: true,
    host: true,
    origin: "http:/0.0.0.0:8000",
  },
  preview: {
    port: 8000,
    strictPort: true,
    host: true,
    open: true,
  },
});
