module.exports = (a, b) => {
	const toolA = a.name.toUpperCase();
	const toolB = b.name.toUpperCase();

	let comparison = 0;

	if (toolA > toolB) {
		comparison = 1;
	} else if (toolA < toolB) {
		comparison = -1;
	}

	return comparison;
};
