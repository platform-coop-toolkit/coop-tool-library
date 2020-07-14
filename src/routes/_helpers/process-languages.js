module.exports = (accumulator, currentValue) => {
	const newLanguages = [];

	Array.prototype.forEach.call(currentValue.languages_supported, language => {
		const fragment = language.iso_name;
		if (!accumulator.includes(fragment)) {
			newLanguages.push(fragment);
		}
	});

	return [...accumulator, ...newLanguages];
};
