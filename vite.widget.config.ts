import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// Widget-specific build configuration
export default defineConfig({
	plugins: [
		tailwindcss(),
		svelte(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	resolve: {
		alias: {
			'$lib': resolve(__dirname, 'src/lib')
		}
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/widget/index.ts'),
			name: 'GhostMemberDirectory',
			fileName: (format) => `widget.${format}.js`,
			formats: ['es', 'iife']
		},
		rollupOptions: {
			external: [],
			output: {
				globals: {}
			}
		},
		outDir: 'static'
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify('production')
	}
});
