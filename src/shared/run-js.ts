import {webFrame} from 'electron';
import {activeWindow} from '../main/active-window';
import {is} from './is';

/**
122,130d33
Run some JavaScript in the active or given window.

@param code - JavaScript code to be executed.
@param web - Default: webContents from current window.
@returns A promise for the result of the executed code or a rejected promise if the result is a rejected promise.
*/
// TODO: Handle if undefined
// eslint-disable-next-line @typescript-eslint/naming-convention
const runJS = (
	code: string,
	web = is.main ? activeWindow()?.webContents : webFrame,
): Promise<unknown> | undefined => web?.executeJavaScript(code);

export {runJS};
