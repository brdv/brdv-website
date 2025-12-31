# AGENTS.md - brdv.nl Website

## Project Overview

**brdv.nl** is a personal portfolio website built with Astro. The site includes:

- Home page (index)
- Blog with dynamic routing (`src/content/blog/`)
- Resume page with organized sections (`src/content/resume/`)
- Contact page
- Dark/light theme support
- Responsive design with Shiki syntax highlighting

**Package Manager**: Bun  
**Build Tool**: Astro 5.16.6  
**Language**: Astro + TypeScript (strict mode)

---

## Essential Commands

### Development

- `bun dev` - Start dev server (localhost:4321)
- `bun build` - Build production site to `./dist/`
- `bun preview` - Preview built site locally
- `bun install` - Install dependencies

### Astro CLI

- `bun astro add [integration]` - Add integrations (React, Vue, Tailwind, etc.)
- `bun astro check` - Type check Astro files

---

## Project Structure

```
src/
├── pages/              # Routed pages
│   ├── index.astro     # Home
│   ├── contact.astro   # Contact
│   ├── resume.astro    # Resume
│   └── blog/           # Blog pages
│       ├── index.astro
│       └── [...slug].astro (dynamic)
├── content/            # Content collections
│   ├── blog/           # Blog posts (markdown)
│   ├── resume/         # Resume sections (markdown)
│   └── config.ts       # Collection schemas
├── components/         # Reusable Astro components
│   ├── Header.astro
│   ├── Footer.astro
│   └── ThemeToggle.astro
├── layouts/            # Page templates
│   ├── BaseLayout.astro
│   └── BlogPostLayout.astro
├── styles/             # Global styles
└── utils/              # Utilities & helpers
```

---

## Key Conventions

### Pages & Routing

- File-based routing: `src/pages/page.astro` → `/page`
- Dynamic routes use brackets: `[slug]`, `[...slug]`
- Blog uses content collections with markdown

### Content Collections

- Collections defined in `src/content/config.ts`
- **Blog**: Posts in `src/content/blog/*.md`
- **Resume**: Sections in `src/content/resume/*.md`
- Use `getCollection()` to query content

### Styling

- Global styles in `src/styles/`
- Scoped styles within `.astro` components
- Theme toggle uses CSS custom properties

### Markdown Rendering

- Shiki syntax highlighting with light/dark themes
- Line wrapping enabled for horizontal scroll prevention

---

## Important Files

| File                           | Purpose                           |
| ------------------------------ | --------------------------------- |
| `astro.config.mjs`             | Astro config (markdown, site URL) |
| `tsconfig.json`                | TypeScript strict mode config     |
| `src/content/config.ts`        | Content collection schemas        |
| `src/layouts/BaseLayout.astro` | Main page template                |
| `src/components/Header.astro`  | Navigation header                 |

---

## Common Tasks

### Add a Blog Post

1. Create markdown file in `src/content/blog/your-post.md`
2. Include frontmatter (title, date, etc. per schema)
3. Post auto-appears at `/blog/your-post`

### Add Resume Section

1. Create markdown in `src/content/resume/section.md`
2. Import in `src/pages/resume.astro`
3. Use `getCollection('resume')` to retrieve

### Modify Theme

- Edit CSS custom properties in styles
- `ThemeToggle.astro` handles light/dark switching
- Shiki theme config in `astro.config.mjs`

### Deploy

- Built site output in `./dist/`
- Deploy as static site (Netlify, Vercel, GitHub Pages)
- Base URL: https://www.brdv.nl
