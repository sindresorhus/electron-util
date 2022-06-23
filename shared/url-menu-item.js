'use strict';

const {shell} = require('electron');

exports.openUrlMenuItem = (options = {}) => {
	if (!options.url) {
		throw new Error('The `url` option is required');
	}

	const {url} = options;
	delete options.url;

	const click = (...args) => {
		if (options.click) {
			options.click(...args);
		}

		shell.openExternal(url);
	};

	return {
		...options,
		click,
	};
};
