function sortByAlphabetical (a, b, reverse) {	
	const itemA = a.toUpperCase();
	const itemB = b.toUpperCase();

	let comparison = 0;

	if (itemA > itemB) {
		comparison = 1;
	} else if (itemA < itemB) {
		comparison = -1;
	}

	return reverse ? !comparison : comparison;
};

module.exports = (a, b, reverse) => {	
	return sortByAlphabetical(a, b, reverse);
};