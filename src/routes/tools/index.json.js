const fetch = require('node-fetch');

import processTools from '../_helpers/process-tools';
import compareTools from '../_helpers/compare-tools';

export async function get(req, res, next) {
	let tools = [];

	await fetch('https://demo.directory.platform.coop/api/tools/')
		.then(result => result.json())
		.then(json => {
			tools = json.map(processTools).sort(compareTools);
		});

	if (tools !== []) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(tools));
	} else {
		next();
	}
}
