import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import fs from 'fs';

const postPaths = fs.readdirSync('./src/posts').map((path) => `/blog/${path}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		mdsvex({
      extensions: ['.md']
    })
	],

	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),
		prerender: {
			entries: postPaths,
		},
	}
};

export default config;
