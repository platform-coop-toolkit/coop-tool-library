const fetch = require('node-fetch');

import processNiches from '../_helpers/process-niches';

function reducePropToStringArray(json, prop) {
    return json.reduce(function(accumulator, currentValue) {
        const fragment = currentValue[prop];
        const newValues = [];
        if (fragment && !accumulator.includes(fragment)) {
            newValues.push(fragment);
        }    
        return [...accumulator, ...newValues];
    }, ['All']).sort();
    
}

export async function get(req, res, next) {
    let filters = {
        niches: [],
        pricings: []
    };

    let niches = [];
    
    let pricings = [];

	await fetch('https://demo.directory.platform.coop/api/tools/')
		.then(result => result.json())
		.then(json => {
            niches = json.reduce(processNiches, ['All']).sort();  
            pricings = reducePropToStringArray(json, "pricing");            
        });
        filters.niches = niches;
        filters.pricings = pricings;

	if (filters.niches !== []) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(filters));
	} else {
		next();
	}
}
