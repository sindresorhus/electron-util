'use strict';
const {_electron: electron} = require('playwright');
const {test, expect} = require('@playwright/test');
const {platform} = require('../dist/shared');

test('util.platform()', async () => {
	const electronApp = await electron.launch({args: ['test/main.cjs']});

	const appPath = await electronApp.evaluate(async ({app}) => app.getAppPath());

	console.log('appPath', appPath);

	const first = await electronApp.evaluate(async () =>
		platform({
			linux: 1,
			macos: 2,
			default: 3,
		}),
	);

	expect(first).toBe(2);
});

// Test('util.platform()', t => {
// 	t.is(
// 		platform({
// 			linux: 1,
// 			macos: 2,
// 			default: 3,
// 		}),
// 		2,
// 	);

// 	t.is(
// 		platform({
// 			linux: 1,
// 			macos: () => 2,
// 			default: 3,
// 		}),
// 		2,
// 	);

// 	t.is(
// 		platform({
// 			linux: 1,
// 			default: 3,
// 		}),
// 		3,
// 	);

// 	t.is(
// 		platform({
// 			linux: 1,
// 		}),
// 		undefined,
// 	);
// });
