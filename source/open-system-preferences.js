'use strict';
const api = require('./api');
const is = require('./is');

module.exports = async (pane, section) => {
	if (is.macos) {
		await api.shell.openExternal(`x-apple.systempreferences:com.apple.preference.${pane}${section ? `?${section}` : ''}`);
	} else if (is.windows) {
		await api.shell.openExternal(`ms-settings:${pane}`);
	}
};
