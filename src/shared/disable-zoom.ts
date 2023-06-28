import {webFrame} from 'electron';
import {is} from './is';
import {activeWindow} from '../main/active-window';

/**
265,276d167
Disable zooming, usually caused by pinching the trackpad on macOS or Ctrl+ on Windows.

@param window - Default: webContents from current window.
*/
const disableZoom = (
	web = is.main ? activeWindow()?.webContents : webFrame,
) => {
	const run = () => {
		// TODO: Check if undefined
		web?.setZoomFactor(1);
	};

	// TODO: Check if undefined
	web?.on('did-finish-load', run);
	run();
};

export {disableZoom};
