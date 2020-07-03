function sortByObjectKey (a, b, key) {	
	const itemA = a[key].toUpperCase();
	const itemB = b[key].toUpperCase();

	let comparison = 0;

	if (itemA > itemB) {
		comparison = 1;
	} else if (itemA < itemB) {
		comparison = -1;
	}

	return comparison;
};

module.exports = (a, b, key) => {	
	return sortByObjectKey(a, b, key);
};