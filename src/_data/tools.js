require('dotenv').config()

const fetch = require('node-fetch');

const endpoint = process.env.TOOLS_API || 'https://directory.platform.coop/api/tools/';

const compareTools = (a, b) => {
    const toolA = a.name.toUpperCase();
    const toolB = b.name.toUpperCase();

    let comparison = 0;

    if (toolA > toolB) {
        comparison = 1;
    } else if (toolA < toolB) {
        comparison = -1;
    }

    return comparison;
};

module.exports = async function() {
    return new Promise((resolve) => {
        fetch(endpoint)
            .then(res => res.json())
            .then(json => {
                const tools = json.map(tool => {
                    if (tool.languages_supported && tool.languages_supported.length > 0)
                    tool.languages = tool.languages_supported.map(language => {
                        return language.iso_name;
                    });
                    if (tool.niches && tool.niches.length > 0)
                    tool.nicheNames = tool.niches.map(niche => {
                        return niche.name;
                    });
                    return tool;
                });
                resolve(tools.sort(compareTools));
            });
        }, function done(err) {
            if (err) {
                reject(error);
            }
        });
}
