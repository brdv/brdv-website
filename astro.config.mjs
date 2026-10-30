// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
  },
  site: "https://www.brdv.nl",
  trailingSlash: "always",
  integrations: [sitemap()],
});
