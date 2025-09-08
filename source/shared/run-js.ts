import electron from 'electron';
import {activeWindow} from '../main/active-window.js';
import {is} from './is.js';

/**
122,130d33
Run some JavaScript in the active or given window.

@param code - JavaScript code to be executed.
@param web - Default: webContents from current window.
@returns A promise for the result of the executed code or a rejected promise if the result is a rejected promise.
*/
// eslint-disable-next-line @typescript-eslint/naming-convention
export const runJS = async (
	code: string,
	web = is.main ? (activeWindow()?.webContents ?? undefined) : electron.webFrame,
): Promise<void> => {
	if (!web) {
		throw new Error('No active window');
	}

	await (web as any).executeJavaScript(code);
};
