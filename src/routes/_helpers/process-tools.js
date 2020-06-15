const slugify = require('slugify');

module.exports = tool => {
    tool.slug = slugify(tool.name.toLowerCase());

	if (tool.languages_supported && tool.languages_supported.length > 0) {
		tool.languages = tool.languages_supported.map(language => {
			return language.iso_name;
		});
		delete tool.languages_supported;
	}

	if (tool.niches && tool.niches.length > 0) {
		const nicheGroups = {};
		Array.prototype.forEach.call(tool.niches, niche => {
			if (niche.name.includes(' - ')) {
				const fragments = niche.name.split(' - ');

				if (!Object.prototype.hasOwnProperty.call(nicheGroups, fragments[0])) {
					nicheGroups[fragments[0]] = [];
				}

				nicheGroups[fragments[0]].push(fragments[1]);
			} else {
				nicheGroups[niche.name] = false;
			}
		});
		tool.niches = nicheGroups;
	}

	return tool;
};
