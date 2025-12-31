// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      // Use high-contrast themes for better readability
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  site: "https://www.brdv.nl",
});
