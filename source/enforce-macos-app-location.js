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

	const clickedButtonIndex = api.dialog.showMessageBox({
		type: 'error',
		message: 'Move to Applications folder?',
		detail: `${api.app.getName()} must live in the Applications folder to be able to run correctly.`,
		buttons: [
			'Move to Applications folder',
			`Quit ${api.app.getName()}`
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
