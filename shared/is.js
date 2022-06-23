'use strict';
const process = require('process');
const isDev = require('electron-is-dev');
const isUsingAsar = require('../main/is-using-asar');

module.exports = {
	macos: process.platform === 'darwin',
	linux: process.platform === 'linux',
	windows: process.platform === 'win32',
	main: process.type === 'browser',
	renderer: process.type === 'renderer',
	// TODO: This runs in main
	usingAsar: isUsingAsar,
	development: isDev,
	macAppStore: process.mas === true,
	windowsStore: process.windowsStore === true,
};
