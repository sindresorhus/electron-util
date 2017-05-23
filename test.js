import test from 'ava';
import mockRequire from 'mock-require';

mockRequire('electron', {
	app: {
		isReady: () => true
	},
	remote: {}
});

const m = require('.');

test('util.select()', t => {
	t.is(m.select({
		linux: 1,
		macos: 2,
		default: 3
	}), 2);

	t.is(m.select({
		linux: 1,
		macos: () => 2,
		default: 3
	}), 2);

	t.is(m.select({
		linux: 1,
		default: 3
	}), 3);

	t.is(m.select({
		linux: 1
	}), undefined);
});
