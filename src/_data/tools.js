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
                languages = fancyConcat(languages);

                tools.push({url, name, license, pricing, sectors, languages});
            });
            fetchNextPage();
            resolve({items: tools});
        }, function done(err) {
            if (err) { console.error(err); reject(error); }
        });
    });
}
