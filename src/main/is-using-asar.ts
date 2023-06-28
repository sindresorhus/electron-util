import {isElectron} from './node';

const isUsingAsar =
	isElectron && require.main && require.main.filename
		? require.main.filename.includes('app.asar')
		: false;

export {isUsingAsar};
