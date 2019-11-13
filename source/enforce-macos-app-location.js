'use strict';
const api = require('./api');
const is = require('./is');

module.exports = () => {
	if (is.development || !is.macos) {
		return;
	}

	if (api.app.isInApplicationsFolder()) {
		return;
	}

	const appName = 'name' in api.app ? api.app.name : api.app.getName();

	const clickedButtonIndex = api.dialog.showMessageBox({
		type: 'error',
		message: 'Move to Applications folder?',
		detail: `${appName} must live in the Applications folder to be able to run correctly.`,
		buttons: [
			'Move to Applications folder',
			`Quit ${appName}`
		],
		defaultId: 0,
		cancelId: 1
	});

	if (clickedButtonIndex === 1) {
		api.app.quit();
		return;
	}

	api.app.moveToApplicationsFolder();
};
