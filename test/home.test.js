/* global beforeAll, describe, expect, it, page */

const url = process.env.HOME_URL;

describe('Homepage', () => {
	beforeAll(async () => {
		await page.goto(url);
	});

	it('Passes Axe tests', async () => {
		await expect(page).toPassAxeTests();
	});
});
