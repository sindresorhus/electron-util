import {webFrame} from 'electron';
import {activeWindow} from '../main/active-window';
import {is} from './is';

/**
Disable zooming, usually caused by pinching the trackpad on macOS or Ctrl+ on Windows.

@param window - Default: webContents from current window.
*/
export const disableZoom = (
	web = is.main ? activeWindow()?.webContents : webFrame,
) => {
	if (!web) {
		throw new Error('No active window');
	}

	const run = () => {
		web.setZoomFactor(1);
	};

	web.on('did-finish-load', run);
	run();
};
