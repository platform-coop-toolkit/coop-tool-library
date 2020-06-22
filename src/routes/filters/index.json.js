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
    }, []).sort();
    
}

export async function get(req, res, next) {
    let filters = {        
        pricing: {values: [], type: "inclusive"},
        license: {values: [], type: "inclusive"},
        niches: {values: [], type: "exclusive"},
        languages: {values: [], type: "inclusive"}
    };

	await fetch('https://demo.directory.platform.coop/api/tools/')
		.then(result => result.json())
		.then(json => {
            filters.niches.values = json.reduce(processNiches, []).sort();  
            filters.languages.values = json.reduce(processLanguages, []).sort();
            filters.pricing.values = reducePropToStringArray(json, "pricing");            
            filters.license.values = reducePropToStringArray(json, "license");            
        });        

	if (filters !== []) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(filters));
	} else {
		next();
	}
}
