module.exports = (array) => {
    let output;
    if (array.length > 2) {
        const lastItem = array.pop();
        output = array.join(', ');
        output += `, and ${lastItem}`;
    } else {
        output = array.join(' and ');
    }

    return output;
}