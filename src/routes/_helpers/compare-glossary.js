const sorts = require('./sort-by-object-key.js')

module.exports = (a, b) => {	
	return sorts.byObjectKey(a, b, "term");
};
