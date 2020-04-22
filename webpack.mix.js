/* global path */

const mix = require('laravel-mix');
require('laravel-mix-svelte');
require('laravel-mix-purgecss');

const staticPath = 'src/_includes/static';

mix.setPublicPath(`./${staticPath}`);

mix.sass('src/scss/main.scss', `${staticPath}/css`, {
	sassOptions: {
		includePaths: [path.join(__dirname, 'node_modules')]
	}
});

mix.js('src/js/main.js', `${staticPath}/js`)
	.svelte({dev: mix.inProduction() || false});

mix.copy('node_modules/@platform-coop-toolkit/pinecone/src/assets/images', `${staticPath}/images`)
	.copy('node_modules/@platform-coop-toolkit/pinecone/src/assets/fonts', `${staticPath}/fonts`)
	.copy('src/images', `${staticPath}/images`)
	.copy('src/fonts', `${staticPath}/fonts`);

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
