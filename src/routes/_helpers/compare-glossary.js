module.exports = (a, b) => {
	const glossaryEntryA = a.term.toUpperCase();
	const glossaryEntryB = b.term.toUpperCase();

	let comparison = 0;

	if (glossaryEntryA > glossaryEntryB) {
		comparison = 1;
	} else if (glossaryEntryA < glossaryEntryB) {
		comparison = -1;
	}

	return comparison;
};
