import {app, dialog} from 'electron';
import {is} from '../shared';
import {isDev} from './dev';

/**
On macOS, for [security reasons](https://github.com/potionfactory/LetsMove/issues/56), if an app is launched outside the Applications folder, it will run in a read-only disk image, which could cause subtle problems for your app.
Use this method to ensure the app lives in the Applications folder.

It must not be used until the `app.whenReady()` promise is resolved.

It will be a no-op during development and on other systems than macOS.

It will offer to automatically move the app for the user.
*/
// eslint-disable-next-line @typescript-eslint/naming-convention
export const enforceMacOSAppLocation = () => {
	if (isDev || !is.macos) {
		return;
	}

	if (app.isInApplicationsFolder()) {
		return;
	}

	const clickedButtonIndex = dialog.showMessageBoxSync({
		type: 'error',
		message: 'Move to Applications folder?',
		detail: `${app.name} must live in the Applications folder to be able to run correctly.`,
		buttons: ['Move to Applications folder', `Quit ${app.name}`],
		defaultId: 0,
		cancelId: 1,
	});

	if (clickedButtonIndex === 1) {
		app.quit();
		return;
	}

	app.moveToApplicationsFolder({
		conflictHandler(conflict) {
			if (conflict === 'existsAndRunning') {
				// Can't replace the active version of the app
				dialog.showMessageBoxSync({
					type: 'error',
					message: `Another version of ${app.name} is currently running. Quit it, then launch this version of the app again.`,
					buttons: ['OK'],
				});

				app.quit();
			}

			return true;
		},
	});
};
