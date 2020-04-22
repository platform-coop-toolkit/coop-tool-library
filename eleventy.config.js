const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const errorOverlay = require('eleventy-plugin-error-overlay');
const fs = require('fs');
const fancyConcat = require('./src/filters/fancy-concat');
const markdownFilter = require('./src/filters/markdown-filter');
const htmlMinTransform = require('./src/transforms/html-min.js');

module.exports = eleventyConfig => {
	// Plugins.
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(errorOverlay);

	// Transforms.
	eleventyConfig.addTransform('htmlmin', htmlMinTransform);

	// Filters.
	eleventyConfig.addFilter('fancyConcat', fancyConcat);
	eleventyConfig.addFilter('markdown', markdownFilter);

	// Passthrough file copy.
	eleventyConfig.addPassthroughCopy({'src/_includes/static/css': 'css'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/fonts': 'fonts'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/images': 'images'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/js': 'js'});
	eleventyConfig.addPassthroughCopy({'src/media': 'media'});
	eleventyConfig.addPassthroughCopy('src/admin/config.yml');
	eleventyConfig.addPassthroughCopy('src/admin/previews.js');
	eleventyConfig.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');

	// BrowserSync.
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: (error, browserSync) => {
				const content404 = fs.readFileSync('dist/404.html');

				browserSync.addMiddleware('*', (request, response) => {
				// Provides the 404 content without redirect.
					response.write(content404);
					response.writeHead(404);
					response.end();
				});
			}
		}
	});

	return {
		dir: {
			input: 'src',
			output: 'dist'
		},
		passthroughFileCopy: true
	};
};
