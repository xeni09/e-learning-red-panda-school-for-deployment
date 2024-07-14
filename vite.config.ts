import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      "@components": path.resolve(
        new URL("./", import.meta.url).pathname,
        "src/components"
      ),
    },
  },
});
