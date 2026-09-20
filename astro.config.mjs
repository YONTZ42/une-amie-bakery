import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://une-amie-bakery.example.com",
  output: "static",
  trailingSlash: "always",
  outDir: "./dist/client",
  build: {
    assets: "_assets",
  },
  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: ["terminal.local"],
    },
  },
});
