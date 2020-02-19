const mix = require('laravel-mix');

mix.setPublicPath('./_site');
	
mix.sass('src/scss/main.scss', '_site/css', {
    sassOptions: {
        includePaths: [path.join(__dirname, 'node_modules')],
    },
});

mix.js('src/js/main.js', '_site/js');

mix.copy('node_modules/@platform-coop-toolkit/pinecone/src/assets/images', '_site/images')
    .copy('node_modules/@platform-coop-toolkit/pinecone/src/assets/fonts', '_site/fonts')
    .copy('src/images', '_site/images')
    .copy('src/fonts', '_site/fonts');

mix.options({
    processCssUrls: false,
});

mix.sourceMaps(false, 'source-map')
    .version();
