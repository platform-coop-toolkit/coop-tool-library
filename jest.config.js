require('dotenv').config();

const jestE2EConfig = {
	preset: 'jest-puppeteer',
	setupFilesAfterEnv: [
		'@wordpress/jest-puppeteer-axe'
	],
	reporters: [
		'default'
	],
	testMatch: [
		'**/test/*.test.js'
	]
};

module.exports = jestE2EConfig;
