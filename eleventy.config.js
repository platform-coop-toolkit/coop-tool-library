const fancyConcat = require('./src/utils/fancy-concat');

module.exports = eleventyConfig => {
	eleventyConfig.addFilter('fancyConcat', fancyConcat);

	return {
		dir: {
			input: 'src',
			output: 'dist'
		}
	};
};
