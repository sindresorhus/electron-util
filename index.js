'use strict';
const path = require('path');
const url = require('url');
const electron = require('electron');
const isDev = require('electron-is-dev');
const node = require('./node');

const api = new Proxy(electron, {
	get: (target, prop) => target[prop] || target.remote[prop]
});

exports.api = api;

const is = {
	macos: process.platform === 'darwin',
	linux: process.platform === 'linux',
	windows: process.platform === 'win32',
	main: process.type === 'browser',
	renderer: process.type === 'renderer',
	usingAsar: node.isUsingAsar,
	development: isDev,
	macAppStore: process.mas === true,
	windowsStore: process.windowsStore === true
};

exports.is = is;

exports.appReady = new Promise(resolve => {
	if (api.app.isReady()) {
		resolve();
	} else {
		api.app.on('ready', resolve);
	}
});

exports.electronVersion = node.electronVersion;

exports.chromeVersion = process.versions.chrome.replace(/\.\d+$/, '');

exports.platform = obj => {
	let platform = process.platform;

	if (platform === 'darwin') {
		platform = 'macos';
	} else if (platform === 'win32') {
		platform = 'windows';
	}

	const fn = platform in obj ? obj[platform] : obj.default;

	return typeof fn === 'function' ? fn() : fn;
};

const activeWindow = () => is.main ?
	electron.BrowserWindow.getFocusedWindow() :
	electron.remote.getCurrentWindow();

exports.activeWindow = activeWindow;

exports.loadFile = (win, filePath) => win.loadURL(url.format({
	protocol: 'file',
	slashes: true,
	pathname: path.resolve(electron.app.getAppPath(), filePath)
}));

exports.runJS = (code, win = activeWindow()) => win.webContents.executeJavaScript(code);

exports.fixPathForAsarUnpack = node.fixPathForAsarUnpack;

function isInApplicationsFolder() {
	const exePath = api.app.getPath('exe');
	const rootApplicationsPath = '/Applications';
	const userApplicationsPath = path.join(api.app.getPath('home'), 'Applications');
	return exePath.startsWith(rootApplicationsPath) || exePath.startsWith(userApplicationsPath);
}

function legacyEnforceMacOSAppLocation() {
	if (!isInApplicationsFolder()) {
		setImmediate(() => {
			api.dialog.showErrorBox('Move to Applications folder', `Please move ${api.app.getName()} to your Applications folder to ensure it runs correctly.`);

			setImmediate(() => {
				api.app.quit();
			});
		});
	}
}

exports.enforceMacOSAppLocation = () => {
	if (is.development || !is.macos) {
		return;
	}

	// Solution for pre-Electron 1.8.1 users
	if (typeof api.app.isInApplicationsFolder !== 'function') {
		return legacyEnforceMacOSAppLocation();
	}

	if (api.app.isInApplicationsFolder()) {
		return;
	}

	const clickedButtonIndex = api.dialog.showMessageBox({
		type: 'error',
		message: 'Move to Applications folder?',
		detail: `${api.app.getName()} must be live in the Applications folder to be able to run correctly.`,
		buttons: ['Move to Applications folder', `Quit ${api.app.getName()}`],
		defaultId: 0,
		cancelId: 1
	});

	if (clickedButtonIndex === 1) {
		api.app.quit();
		return;
	}

	api.app.moveToApplicationsFolder();
};

exports.menuBarHeight = () => is.macos ? api.screen.getPrimaryDisplay().workArea.y : 0;
