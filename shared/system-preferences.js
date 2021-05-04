'use strict';
const {shell} = require('electron');
const is = require('./is');

module.exports = async (pane, section) => {
	if (is.macos) {
		await shell.openExternal(`x-apple.systempreferences:com.apple.preference.${pane}${section ? `?${section}` : ''}`);
	} else if (is.windows) {
		await shell.openExternal(`ms-settings:${pane}`);
	}

	await shell.openExternal(`x-apple.systempreferences:com.apple.preference.${pane}${section ? `?${section}` : ''}`);
};
