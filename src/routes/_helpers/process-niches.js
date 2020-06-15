module.exports = (accumulator, currentValue) => {
	const newNiches = [];

	Array.prototype.forEach.call(currentValue.niches, niche => {
		const fragment = niche.name.split(' - ')[0];
		if (!accumulator.includes(fragment)) {
			newNiches.push(fragment);
		}
	});

	return [...accumulator, ...newNiches];
};
