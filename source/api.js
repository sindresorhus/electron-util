'use strict';

const electron = require('electron');
const {initialize} = require('@electron/remote/main');

const initializeRemote = () => {
	if (process.type !== 'browser') {
		throw new Error('The remote api must be initialized from the main process.');
	}

	initialize();
};

const remote = new Proxy({}, {
	get: (target, property) => {
		const remote = require('@electron/remote');
		return remote[property];
	}
});

const api = new Proxy(electron, {
	get: (target, property) => {
		if (target[property]) {
			return target[property];
		}

		return remote[property];
	}
});

module.exports = {initializeRemote, remote, api};
