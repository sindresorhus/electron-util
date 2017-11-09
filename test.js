import test from 'ava';
import mockRequire from 'mock-require';

process.versions.chrome = '62.0.3202';

mockRequire('electron', {
	app: {
		isReady: () => true
	},
	remote: {}
});

const m = require('.');

test('util.platform()', t => {
	t.is(m.platform({
		linux: 1,
		macos: 2,
		default: 3
	}), 2);

	t.is(m.platform({
		linux: 1,
		macos: () => 2,
		default: 3
	}), 2);

	t.is(m.platform({
		linux: 1,
		default: 3
	}), 3);

	t.is(m.platform({
		linux: 1
	}), undefined);
});
