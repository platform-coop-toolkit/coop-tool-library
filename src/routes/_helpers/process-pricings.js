module.exports = (accumulator, currentValue) => {    
    const fragment = currentValue.pricing;
    const newPricings = [];
    if (fragment && !accumulator.includes(fragment)) {
        newPricings.push(fragment);
    }    
    return [...accumulator, ...newPricings];
};
