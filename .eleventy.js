const fancyConcat = require('./src/utils/fancyConcat');

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter('fancyConcat', fancyConcat);

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
