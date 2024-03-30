import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkUnwrapImages from 'remark-unwrap-images'

export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkUnwrapImages],
  },
});



