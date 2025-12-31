---
title: "Building a Personal Website with Astro"
date: 2025-12-20
slug: "building-with-astro"
description: "My experience rebuilding my personal website using Astro - a modern static site generator"
---

# Building a Personal Website with Astro

I recently rebuilt my personal website from scratch using [Astro](https://astro.build), and I'm really happy with the results. Here's why I chose Astro and what I learned along the way.

## Why Astro?

After researching various options, Astro stood out for several reasons:

### 1. Content-First Design

Astro is built specifically for content-heavy sites like blogs and documentation. It has first-class support for Markdown and MDX, making it perfect for a personal website.

### 2. Zero JavaScript by Default

Astro ships zero JavaScript to the browser by default. This means incredibly fast page loads and better performance out of the box.

### 3. Component Islands

When you do need interactivity, Astro's "Islands Architecture" lets you use components from React, Vue, Svelte, or any other framework - but only where you need them.

### 4. Great Developer Experience

The development experience is smooth with:

- Fast hot module replacement
- Built-in TypeScript support
- Excellent documentation
- Simple file-based routing

## Key Features I Implemented

### Content Collections

Astro's content collections provide type-safe frontmatter and automatic content validation:

```typescript
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    slug: z.string().optional(),
    description: z.string().optional(),
  }),
});
```

### Syntax Highlighting

Built-in syntax highlighting with Shiki supports dual themes for light/dark mode:

```javascript
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
```

### Theme Switching

Implemented a theme toggle that:

- Respects system preferences
- Persists user choice to localStorage
- Prevents flash of wrong theme on page load

## Deployment

Deploying to Vercel was incredibly simple - just connect the GitHub repository and Vercel handles the rest. Zero configuration needed!

## Conclusion

Astro has been a joy to work with. It's fast, modern, and perfect for content-focused sites. If you're building a blog or personal website, I highly recommend giving it a try.

The entire source code for this website is available on [GitHub](https://github.com/brdv).

Happy building! 🚀
