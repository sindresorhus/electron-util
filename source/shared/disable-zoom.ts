import electron from 'electron';
import {activeWindow} from '../main/active-window.js';
import {is} from './is.js';

/**
Disable zooming, usually caused by pinching the trackpad on macOS or Ctrl+ on Windows.

@param window - Default: webContents from current window.
*/
export const disableZoom = (
	web = is.main ? activeWindow()?.webContents : electron.webFrame,
) => {
	if (!web) {
		throw new Error('No active window');
	}

	const run = () => {
		web.setZoomFactor(1);
	};

	// TODO: Look into the `any` here.
	(web as any).on('did-finish-load', run); // eslint-disable-line @typescript-eslint/no-unsafe-call
	run();
};
