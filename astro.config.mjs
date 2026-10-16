// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.procuradoraencordoba.es',
  // Páginas estáticas; solo /api/contact se ejecuta en servidor (prerender = false)
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    tailwind(),
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
  adapter: vercel()
});
