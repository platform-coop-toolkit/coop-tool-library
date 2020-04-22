/* global path */

const mix = require('laravel-mix');
require('laravel-mix-svelte');
require('laravel-mix-purgecss');

const distPath = 'dist';

mix.setPublicPath(`./${distPath}`);

mix.sass('src/scss/main.scss', `${distPath}/css`, {
	sassOptions: {
		includePaths: [path.join(__dirname, 'node_modules')]
	}
});

mix.js('src/js/main.js', `${distPath}/js`)
	.svelte({dev: mix.inProduction() || false});

mix.copy('node_modules/@platform-coop-toolkit/pinecone/src/assets/images', `${distPath}/images`)
	.copy('node_modules/@platform-coop-toolkit/pinecone/src/assets/fonts', `${distPath}/fonts`)
	.copy('src/images', `${distPath}/images`)
	.copy('src/fonts', `${distPath}/fonts`);

mix.options({
	processCssUrls: false
});

if (mix.inProduction()) {
	mix.purgeCss({
		content: [
			'./src/_includes/**/*.njk',
			'./src/_includes/svg/*.svg',
			'./src/components/*.svelte',
			'./src/transforms/*.js'
		]
	})
		.sourceMaps(false, 'source-map')
		.version();
}
