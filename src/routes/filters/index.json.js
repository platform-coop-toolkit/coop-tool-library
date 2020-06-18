const fetch = require('node-fetch');

import processNiches from '../_helpers/process-niches';

export async function get(req, res, next) {
    let filters = {
        niches: []
    };

	let niches = [];

	await fetch('https://demo.directory.platform.coop/api/tools/')
		.then(result => result.json())
		.then(json => {
			niches = json.reduce(processNiches, ['All']).sort();
        });
        filters.niches = niches;

	if (filters.niches !== []) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(filters));
	} else {
		next();
	}
}
