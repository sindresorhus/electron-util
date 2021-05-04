'use strict';

const {app, dialog} = require('electron');
const is = require('../shared/is');

exports.showAboutWindow = (options = {}) => {
	if (!is.windows) {
		if (
			options.copyright ||
			(is.linux && options.icon) ||
			(is.linux && options.website)
		) {
			const aboutPanelOptions = {
				copyright: options.copyright
			};

			if (is.linux && options.icon) {
				aboutPanelOptions.iconPath = options.icon;
				delete aboutPanelOptions.icon;
			}

			app.setAboutPanelOptions(aboutPanelOptions);
		}

		app.showAboutPanel();

		return;
	}

	options = {
		title: 'About',
		...options
	};

	// TODO: Make this just `app.name` when targeting Electron 7.
	const appName = 'name' in app ? app.name : app.getName();

	const text = options.text ? `${options.copyright ? '\n\n' : ''}${options.text}` : '';

	dialog.showMessageBox({
		title: `${options.title} ${appName}`,
		message: `Version ${app.getVersion()}`,
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

	const appName = 'name' in app ? app.name : app.getName();

	return {
		label: `${options.title} ${appName}`,
		click() {
			exports.showAboutWindow(options);
		}
	};
};
