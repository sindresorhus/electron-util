'use strict';

const {screen} = require('electron');
const {is} = require('../shared/is');
const {activeWindow} = require('./active-window');

exports.menuBarHeight = () => is.macos ? screen.getPrimaryDisplay().workArea.y : 0;

exports.getWindowBoundsCentered = options => {
	options = {
		window: activeWindow(),
		...options,
	};

	const [width, height] = options.window.getSize();
	const windowSize = options.size > 0 || {width, height};
	const screenSize = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).workArea;
	const x = Math.floor(screenSize.x + ((screenSize.width / 2) - (windowSize.width / 2)));
	const y = Math.floor(((screenSize.height + screenSize.y) / 2) - (windowSize.height / 2));

	return {
		x,
		y,
		width: windowSize.width,
		height: windowSize.height,
	};
};

exports.centerWindow = options => {
	options = {
		window: activeWindow(),
		animated: false,
		...options,
	};

	const bounds = exports.getWindowBoundsCentered(options);
	options.window.setBounds(bounds, options.animated);
};
