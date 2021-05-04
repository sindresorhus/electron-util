'use strict';

const {app, dialog} = require('electron');
const is = require('../shared/is');

module.exports = () => {
	if (is.development || !is.macos) {
		return;
	}

	if (app.isInApplicationsFolder()) {
		return;
	}

	const appName = 'name' in app ? app.name : app.getName();

	const clickedButtonIndex = dialog.showMessageBoxSync({
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
		app.quit();
		return;
	}

	app.moveToApplicationsFolder({
		conflictHandler: conflict => {
			if (conflict === 'existsAndRunning') { // Can't replace the active version of the app
				dialog.showMessageBoxSync({
					type: 'error',
					message: `Another version of ${appName} is currently running. Quit it, then launch this version of the app again.`,
					buttons: [
						'OK'
					]
				});

				app.quit();
			}

			return true;
		}
	});
};
