import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// Widget-specific build configuration
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/widget/index.ts'),
			name: 'GhostMemberDirectory',
			fileName: (format) => `ghost-member-directory.${format}.js`,
			formats: ['es', 'umd', 'iife']
		},
		rollupOptions: {
			external: [],
			output: {
				globals: {}
			}
		},
		outDir: 'dist/widget'
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify('production')
	}
});
