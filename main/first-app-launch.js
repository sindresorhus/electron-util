'use strict';

const fs = require('fs');
const path = require('path');
const {app} = require('electron');

const isFirstAppLaunch = () => {
	const checkFile = path.join(app.getPath('userData'), '.electron-util--has-app-launched');

	if (fs.existsSync(checkFile)) {
		return false;
	}

	try {
		fs.writeFileSync(checkFile, '');
	} catch (error) {
		if (error.code === 'ENOENT') {
			fs.mkdirSync(app.getPath('userData'));
			return isFirstAppLaunch();
		}
	}

	return true;
};

exports.isFirstAppLaunch = isFirstAppLaunch;
