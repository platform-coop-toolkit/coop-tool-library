const fetch = require('node-fetch');

import processTools from '../_helpers/process-tools';
import compareTools from '../_helpers/compare-tools';

export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	let tools = [];

	await fetch('https://demo.directory.platform.coop/api/tools/')
		.then(result => result.json())
		.then(json => {
			tools = json.map(processTools).sort(compareTools);
		});

	if (tools !== []) {
		const lookup = new Map();
		tools.forEach(tool => {
			lookup.set(tool.slug, JSON.stringify(tool));
		});

		if (lookup.has(slug)) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});

			res.end(lookup.get(slug));
		} else {
			res.writeHead(404, {
				'Content-Type': 'application/json'
			});

			res.end(JSON.stringify({
				message: `Not found`
			}));
		}
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
