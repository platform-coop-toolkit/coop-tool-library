const slugify = require('slugify');

module.exports = value => {
	return slugify(value, {
		lower: true,
		strict: true
	});
};
