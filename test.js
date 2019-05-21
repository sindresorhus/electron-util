import test from 'ava';
import mockRequire from 'mock-require';

process.versions.chrome = '62.0.3202';

mockRequire('electron', {
	app: {
		isReady: () => true
	},
	remote: {}
});

const {platform} = require('.');

test('util.platform()', t => {
	t.is(platform({
		linux: 1,
		macos: 2,
		default: 3
	}), 2);

	t.is(platform({
		linux: 1,
		macos: () => 2,
		default: 3
	}), 2);

	t.is(platform({
		linux: 1,
		default: 3
	}), 3);

	t.is(platform({
		linux: 1
	}), undefined);
});
