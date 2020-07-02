const slugify = require('slugify');

module.exports = glossaryEntry => {
    glossaryEntry.slug = slugify(glossaryEntry.term.toLowerCase());

	return glossaryEntry;
};
