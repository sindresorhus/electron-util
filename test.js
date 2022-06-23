const process = require('process');
const test = require('ava');
const mockRequire = require('mock-require');

process.versions.chrome = '62.0.3202';

mockRequire('electron', {
	app: {
		isReady: () => true,
	},
	remote: {},
});

const {platform} = require('./shared');

test('util.platform()', t => {
	t.is(platform({
		linux: 1,
		macos: 2,
		default: 3,
	}), 2);

	t.is(platform({
		linux: 1,
		macos: () => 2,
		default: 3,
	}), 2);

	t.is(platform({
		linux: 1,
		default: 3,
	}), 3);

	t.is(platform({
		linux: 1,
	}), undefined);
});
