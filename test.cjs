const process = require('node:process');
const test = require('ava');
const mockRequire = require('mock-require');
const {platform} = require('./dist/shared');

Object.defineProperty(process.versions, 'chrome', {
	value: '62.0.3202',
	writable: false,
});

mockRequire('electron', {
	app: {
		isReady: () => true,
	},
	remote: {},
});

test('util.platform()', t => {
	t.is(
		platform({
			linux: 1,
			macos: 2,
			default: 3,
		}),
		2,
	);

	t.is(
		platform({
			linux: 1,
			macos: () => 2,
			default: 3,
		}),
		2,
	);

	t.is(
		platform({
			linux: 1,
			default: 3,
		}),
		3,
	);

	t.is(
		platform({
			linux: 1,
		}),
		undefined,
	);
});
