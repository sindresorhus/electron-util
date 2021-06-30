'use strict';
const os = require('os');
const path = require('path');
const electron = require('electron');
const newGithubIssueUrl = require('new-github-issue-url');
const node = require('./node');

const {api, remote, initializeRemote} = require('./source/api');

exports.api = api;
exports.initializeRemote = initializeRemote;

const is = require('./source/is');

exports.is = is;

exports.electronVersion = node.electronVersion;

exports.chromeVersion = process.versions.chrome.replace(/\.\d+$/, '');

exports.platform = object => {
	let {platform} = process;

	if (platform === 'darwin') {
		platform = 'macos';
	} else if (platform === 'win32') {
		platform = 'windows';
	}

	const fn = platform in object ? object[platform] : object.default;

	return typeof fn === 'function' ? fn() : fn;
};

const activeWindow = () => is.main ?
	electron.BrowserWindow.getFocusedWindow() :
	remote.getCurrentWindow();

exports.activeWindow = activeWindow;

exports.runJS = (code, win = activeWindow()) => win.webContents.executeJavaScript(code);

exports.fixPathForAsarUnpack = node.fixPathForAsarUnpack;

exports.enforceMacOSAppLocation = require('./source/enforce-macos-app-location');

exports.menuBarHeight = () => is.macos ? api.screen.getPrimaryDisplay().workArea.y : 0;

exports.getWindowBoundsCentered = options => {
	options = {
		window: activeWindow(),
		...options
	};

	const currentDisplay = api.screen.getDisplayNearestPoint(api.screen.getCursorScreenPoint());
	const [width, height] = options.window.getSize();
	const windowSize = options.size || {width, height};
	const screenSize = options.useFullBounds ?
		currentDisplay.bounds :
		currentDisplay.workArea;
	const x = Math.floor(screenSize.x + ((screenSize.width / 2) - (windowSize.width / 2)));
	const y = Math.floor(((screenSize.height + screenSize.y) / 2) - (windowSize.height / 2));

	return {
		x,
		y,
		width: windowSize.width,
		height: windowSize.height
	};
};

exports.centerWindow = options => {
	options = {
		window: activeWindow(),
		animated: false,
		...options
	};

	const bounds = exports.getWindowBoundsCentered(options);
	options.window.setBounds(bounds, options.animated);
};

exports.disableZoom = (win = activeWindow()) => {
	const {webContents} = win;

	const run = () => {
		webContents.setZoomFactor(1);
		webContents.setLayoutZoomLevelLimits(0, 0);
	};

	webContents.on('did-finish-load', run);
	run();
};

exports.appLaunchTimestamp = Date.now();

if (is.main) {
	const isFirstAppLaunch = () => {
		const fs = require('fs');
		const checkFile = path.join(api.app.getPath('userData'), '.electron-util--has-app-launched');

		if (fs.existsSync(checkFile)) {
			return false;
		}

		try {
			fs.writeFileSync(checkFile, '');
		} catch (error) {
			if (error.code === 'ENOENT') {
				fs.mkdirSync(api.app.getPath('userData'));
				return isFirstAppLaunch();
			}
		}

		return true;
	};

	exports.isFirstAppLaunch = isFirstAppLaunch;
}

exports.darkMode = {
	get isEnabled() {
		if (!is.macos) {
			return false;
		}

		return api.nativeTheme.shouldUseDarkColors;
	},

	onChange(callback) {
		if (!is.macos) {
			return () => {};
		}

		const handler = () => {
			callback();
		};

		api.nativeTheme.on('updated', handler);

		return () => {
			api.nativeTheme.off(handler);
		};
	}
};

exports.setContentSecurityPolicy = async (policy, options) => {
	await api.app.whenReady();

	if (!policy.split('\n').filter(line => line.trim()).every(line => line.endsWith(';'))) {
		throw new Error('Each line must end in a semicolon');
	}

	policy = policy.replace(/[\t\n]/g, '').trim();

	options = {
		session: api.session.defaultSession,
		...options
	};

	options.session.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Content-Security-Policy': [policy]
			}
		});
	});
};

exports.openNewGitHubIssue = options => {
	const url = newGithubIssueUrl(options);
	api.shell.openExternal(url);
};

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

		api.shell.openExternal(url);
	};

	return {
		...options,
		click
	};
};

exports.showAboutWindow = (options = {}) => {
	// TODO: When https://github.com/electron/electron/issues/18918 is fixed,
	// these defaults should not need to be set for Linux.
	// TODO: The defaults are standardized here, instead of being set in
	// Electron when https://github.com/electron/electron/issues/23851 is fixed.

	const appName = api.app.getName();
	const appVersion = api.app.getVersion();

	const aboutPanelOptions = {
		applicationName: appName,
		applicationVersion: appVersion
	};

	if (options.icon) {
		aboutPanelOptions.iconPath = options.icon;
	}

	if (options.copyright) {
		aboutPanelOptions.copyright = options.copyright;
	}

	if (options.text) {
		aboutPanelOptions.copyright = (options.copyright || '') + '\n\n' + options.text;
	}

	if (options.website) {
		aboutPanelOptions.website = options.website;
	}

	api.app.setAboutPanelOptions(aboutPanelOptions);
	api.app.showAboutPanel();
};

exports.aboutMenuItem = (options = {}) => {
	options = {
		title: 'About',
		...options
	};

	// TODO: When https://github.com/electron/electron/issues/15589 is fixed,
	// handle the macOS case here, so the user doesn't need a conditional
	// when used in a cross-platform app

	return {
		label: `${options.title} ${api.app.getName()}`,
		click() {
			exports.showAboutWindow(options);
		}
	};
};

exports.debugInfo = () => `
${api.app.getName()} ${api.app.getVersion()}
Electron ${exports.electronVersion}
${process.platform} ${os.release()}
Locale: ${api.app.getLocale()}
`.trim();

exports.appMenu = (menuItems = []) => {
	// TODO: When https://github.com/electron/electron/issues/15589 is fixed,
	// handle the macOS case here, so the user doesn't need a conditional
	// when used in a cross-platform app

	return {
		label: api.app.getName(),
		submenu: [
			{
				role: 'about'
			},
			{
				type: 'separator'
			},
			...menuItems,
			{
				type: 'separator'
			},
			{
				role: 'services'
			},
			{
				type: 'separator'
			},
			{
				role: 'hide'
			},
			{
				role: 'hideothers'
			},
			{
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				role: 'quit'
			}
		].filter(Boolean)
	};
};

exports.openSystemPreferences = require('./source/open-system-preferences');

// TODO: Move more of the larger methods here into separate files.
