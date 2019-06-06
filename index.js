'use strict';
const os = require('os');
const path = require('path');
const electron = require('electron');
const isDev = require('electron-is-dev');
const newGithubIssueUrl = require('new-github-issue-url');
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

exports.electronVersion = node.electronVersion;

exports.chromeVersion = process.versions.chrome.replace(/\.\d+$/, '');

exports.platform = obj => {
	let {platform} = process;

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

exports.runJS = (code, win = activeWindow()) => win.webContents.executeJavaScript(code);

exports.fixPathForAsarUnpack = node.fixPathForAsarUnpack;

exports.enforceMacOSAppLocation = () => {
	if (is.development || !is.macos) {
		return;
	}

	if (api.app.isInApplicationsFolder()) {
		return;
	}

	const clickedButtonIndex = api.dialog.showMessageBox({
		type: 'error',
		message: 'Move to Applications folder?',
		detail: `${api.app.getName()} must live in the Applications folder to be able to run correctly.`,
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

exports.getWindowBoundsCentered = options => {
	options = {
		window: activeWindow(),
		...options
	};

	const [width, height] = options.window.getSize();
	const windowSize = options.size || {width, height};
	const screenSize = api.screen.getDisplayNearestPoint(api.screen.getCursorScreenPoint()).workArea;
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

		return api.systemPreferences.isDarkMode();
	},

	onChange(callback) {
		if (!is.macos) {
			return () => {};
		}

		const id = api.systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
			callback();
		});

		return () => {
			api.systemPreferences.unsubscribeNotification(id);
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

exports.showAboutWindow = options => {
	if (is.macos) {
		if (options.copyright) {
			api.app.setAboutPanelOptions({copyright: options.copyright});
		}

		api.app.showAboutPanel();

		return;
	}

	options = {
		title: 'About',
		...options
	};

	const appName = api.app.getName();

	const text = options.text ? `${options.copyright ? '\n\n' : ''}${options.text}` : '';

	api.dialog.showMessageBox({
		title: `${options.title} ${appName}`,
		message: `Version ${api.app.getVersion()}`,
		detail: (options.copyright || '') + text,
		icon: options.icon,

		// This is needed for Linux, since at least Ubuntu does not show a close button
		buttons: [
			'OK'
		]
	});
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
