const fetch = require('node-fetch');

import processNiches from '../_helpers/process-niches';
import processLanguages from '../_helpers/process-languages';

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
        pricing: [],
        license: [],
        niches: [],
        languages: []
    };

	await fetch('https://demo.directory.platform.coop/api/tools/')
		.then(result => result.json())
		.then(json => {
            filters.niches = json.reduce(processNiches, ['All']).sort();  
            filters.languages = json.reduce(processLanguages, ['All']).sort();
            filters.pricing = reducePropToStringArray(json, "pricing");            
            filters.license = reducePropToStringArray(json, "license");            
        });        

	if (filters !== []) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(filters));
	} else {
		next();
	}
}
