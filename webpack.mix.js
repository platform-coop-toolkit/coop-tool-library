/* global path */

const mix = require('laravel-mix');
require('laravel-mix-svelte');

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

mix.sourceMaps(false, 'source-map')
	.version();
