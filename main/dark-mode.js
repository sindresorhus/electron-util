'use strict';

const {nativeTheme} = require('electron');
const {is} = require('../shared/is');

exports.darkMode = {
	get isEnabled() {
		if (!is.macos) {
			return false;
		}

		return nativeTheme.shouldUseDarkColors;
	},

	onChange(callback) {
		if (!is.macos) {
			return () => {};
		}

		const handler = () => {
			callback();
		};

		nativeTheme.on('updated', handler);

		return () => {
			nativeTheme.off(handler);
		};
	}
};
