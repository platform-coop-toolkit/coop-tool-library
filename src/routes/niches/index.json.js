const fetch = require('node-fetch');

import processNiches from '../_helpers/process-niches';

export async function get(req, res, next) {
	let niches = [];

	await fetch('https://demo.directory.platform.coop/api/tools/')
		.then(result => result.json())
		.then(json => {
			niches = json.reduce(processNiches, ['All']).sort();
		});

	if (niches !== []) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(niches));
	} else {
		next();
	}
}
