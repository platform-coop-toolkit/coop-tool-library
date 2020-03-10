require('dotenv').config()
const apiKey = process.env.AIRTABLE_API_KEY;
const airtable = require('airtable');
const base = new airtable({apiKey}).base('app2PPGcwBN1aSciK');

const fancyConcat = (array) => {
    let output;
    if (array.length > 2) {
        const lastItem = array.pop();
        output = array.join(', ');
        output += `, and ${lastItem}`;
    } else {
        output = array.join(' and ');
    }
    return output;
};

const compareTools = (a, b) => {
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

module.exports = async function() {
    return new Promise((resolve, reject) => {
        var tools = [];

        base('Tools').select().eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                const name = record.get('Name');
                const license = record.get('License');
                const pricing = record.get('Pricing');
                const url = record.get('URL');
                let sectors = record.get('Sector');
                let languages = record.get('Language Support');
                if (!sectors) {
                    sectors = 'Any';
                } else {
                    sectors = fancyConcat(sectors);
                }
                if (languages) {
                    languages = fancyConcat(languages);
                }

                tools.push({url, name, license, pricing, sectors, languages});
            });
            fetchNextPage();
            resolve({items: tools.sort(compareTools)});
        }, function done(err) {
            if (err) { console.error(err); reject(error); }
        });
    });
}
