// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      // Use github themes for syntax highlighting
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
