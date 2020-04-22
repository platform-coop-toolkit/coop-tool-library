module.exports = {
	plugins: [
		'html',
		'@tivac/svelte'
	],
	extends: [
		'plugin:@tivac/svelte/svelte'
	],
	rules: {
		'no-new': 0,
		'no-warning-comments': 0,
		'import/no-unassigned-import': 0,
		'import/extensions': [0, 'never', {svelte: 'always'}]
	},
	ignores: ['src/admin/previews.js'] // TODO: Configure rather than ignoring.
};
