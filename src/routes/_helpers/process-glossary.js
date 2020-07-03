const slugify = require('slugify');

module.exports = glossaryEntry => {
    let processedEntry = {};
        
    Object.keys(glossaryEntry).forEach(function (key) {                
        let newKey = key.toLowerCase();
        processedEntry[newKey] = glossaryEntry[key];
    })

    processedEntry.slug = slugify(processedEntry.term);

    return processedEntry
};
