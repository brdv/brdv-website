// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
  site: 'https://www.brdv.nl',
});
