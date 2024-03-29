import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  // markdown: {
  //   // Applied to .md and .mdx files
  //   remarkPlugins: [markdownItAttrs],
  // },
});



