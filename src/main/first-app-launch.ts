import fs from 'fs';
import path from 'path';
import {app} from 'electron';

function isError(error: any): error is NodeJS.ErrnoException {
	return error instanceof Error;
}

/**
It works by writing a file to `app.getPath('userData')` if it doesn't exist and checks that.
That means it will return true the first time you add this check to your app.

@returns A `boolean` of whether it's the first time your app is launched.
*/
const isFirstAppLaunch = (): boolean => {
	const checkFile = path.join(
		app.getPath('userData'),
		'.electron-util--has-app-launched',
	);

	if (fs.existsSync(checkFile)) {
		return false;
	}

	try {
		fs.writeFileSync(checkFile, '');
	} catch (error) {
		if (isError(error)) {
			if (error.code === 'ENOENT') {
				fs.mkdirSync(app.getPath('userData'));
				return isFirstAppLaunch();
			}
		} else {
			throw error;
		}
	}

	return true;
};

export {isFirstAppLaunch};
