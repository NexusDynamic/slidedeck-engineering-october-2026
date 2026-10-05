import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

// the figures, design tokens, fonts and images come straight from the site repo, which is
// expected to be checked out next to this one (deck.css uses the same relative path)
const siteRoot = resolve(import.meta.dirname, '../zeyus.github.io');

export default defineConfig({
	plugins: [tailwindcss(), svelte({ preprocess: vitePreprocess({ script: true }) })],
	resolve: {
		alias: {
			$site: resolve(siteRoot, 'src'),
			$siteStatic: resolve(siteRoot, 'static')
		},
		// the site's components would otherwise import the site's own copy of svelte
		dedupe: ['svelte']
	},
	server: { fs: { allow: ['.', siteRoot] } }
});
