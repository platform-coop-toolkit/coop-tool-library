const fetch = require('node-fetch');

import processNiches from '../_helpers/process-niches';
import processPricings from '../_helpers/process-pricings';

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
            pricings = json.reduce(processPricings, ['All']).sort();
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
