'use strict';
const electron = require('electron');

// TODO: Implement everything
// Maybe use Proxy to reduce boilerplate
const api = {
	app: electron.app || electron.remote.app,
	BrowserWindow: electron.BrowserWindow || electron.remote.BrowserWindow,
	dialog: electron.dialog | electron.remote.dialog
};

exports.api = api;

const is = {
	main: process.type === 'browser',
	renderer: process.type === 'renderer',
	macos: process.platform === 'darwin',
	linux: process.platform === 'linux',
	window: process.platform === 'win32'
};

exports.is = is;

exports.appReady = new Promise(resolve => {
	if (api.app.isReady()) {
		resolve();
	} else {
		api.app.on('ready', resolve);
	}
});

exports.select = obj => {
	let platform = process.platform;

	if (platform === 'darwin') {
		platform = 'macos';
	} else if (platform === 'win32') {
		platform = 'window';
	}

	const fn = platform in obj ? obj[platform] : obj.default;

	return typeof fn === 'function' ? fn() : fn;
};

const activeWindow = () => is.main ?
	electron.BrowserWindow.getFocusedWindow() :
	electron.remote.getCurrentWindow();

exports.activeWindow = activeWindow;

exports.runJS = (code, win = activeWindow()) => win.webContents.executeJavaScript(code);
