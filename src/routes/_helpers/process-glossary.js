const slugify = require('slugify');

module.exports = glossaryEntry => {
    let processedEntry = {};
    let synonyms = [];
        
    Object.keys(glossaryEntry).forEach(function (key) {                        
        if(key.includes("Synonym")) {
            if(glossaryEntry[key] !== "") {
                synonyms.push(glossaryEntry[key])
            };
        } else {
            processedEntry[key] = glossaryEntry[key];
        }
        
    })

    processedEntry.slug = slugify(processedEntry.term);
    processedEntry.synonyms = synonyms;

    return processedEntry
};
