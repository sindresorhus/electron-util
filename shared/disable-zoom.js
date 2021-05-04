'use strict';

const {webFrame} = require('electron');
const {is} = require('../shared/is');
const {activeWindow} = require('../main/active-window');

exports.disableZoom = (web = is.main ? activeWindow().webContents : webFrame) => {
	const run = () => {
		web.setZoomFactor(1);
	};

	web.on('did-finish-load', run);
	run();
};
