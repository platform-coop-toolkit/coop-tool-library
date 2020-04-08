module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter('fancyConcat', (array, subkey) => {
        let output;
        if (array.length > 2) {
            const lastItem = array.pop();
            output = array.join(', ');
            output += `, and ${lastItem}`;
        } else {
            output = array.join(' and ');
        }
        return output;
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
