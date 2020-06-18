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
        niche: [],
        pricing: [],
        license: []
    };

	await fetch('https://demo.directory.platform.coop/api/tools/')
		.then(result => result.json())
		.then(json => {
            filters.niche = json.reduce(processNiches, ['All']).sort();  
            filters.pricing = reducePropToStringArray(json, "pricing");            
            filters.license = reducePropToStringArray(json, "license");            
        });

	if (filters.niches !== []) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(filters));
	} else {
		next();
	}
}
