import {type BrowserWindow, type Rectangle, type Size, screen} from 'electron';
import {is} from '../shared';
import {activeWindow} from './active-window';

type GetWindowBoundsCenteredOptions = {
	/**
	The window to get the bounds of.

	Default: Current window
	*/
	readonly window?: BrowserWindow;

	/**
	Set a new window size.

	Default: Size of `window`

	@example
	```
	{width: 600, height: 400}
	```
	*/
	readonly size?: Size;

	/**
	Use the full display size when calculating the position.
	By default, only the workable screen area is used, which excludes the Windows taskbar and macOS dock.

	@default false
	*/
	readonly useFullBounds?: boolean;
};

type CenterWindowOptions = {
	/**
	The window to center.

	Default: Current window
	*/
	readonly window?: BrowserWindow;

	/**
	Set a new window size.

	Default: Size of `window`

	@example
	```
	{width: 600, height: 400}
	```
	*/
	readonly size?: Size;

	/**
	Animate the change.

	@default false
	*/
	readonly animated?: boolean;

	/**
	Use the full display size when calculating the position.
	By default, only the workable screen area is used, which excludes the Windows taskbar and macOS dock.

	@default false
	*/
	readonly useFullBounds?: boolean;
};

/**
@returns The height of the menu bar on macOS, or `0` if not macOS.
*/
const menuBarHeight = () =>
	is.macos ? screen.getPrimaryDisplay().workArea.y : 0;

/**
Get the [bounds](https://electronjs.org/docs/api/browser-window#wingetbounds) of a window as if it was centered on the screen.

@returns Bounds of a window.
*/
const getWindowBoundsCentered = (
	options?: GetWindowBoundsCenteredOptions,
): Rectangle => {
	options = {
		window: activeWindow() ?? undefined,
		...options,
	};

	// TODO: Check for undefined
	const [width, height] = options.window!.getSize();
	const windowSize = options.size ?? {width, height};
	const screenSize = screen.getDisplayNearestPoint(
		screen.getCursorScreenPoint(),
	).workArea;
	const x = Math.floor(
		// eslint-disable-next-line no-mixed-operators
		screenSize.x + (screenSize.width / 2 - (windowSize.width ?? 0) / 2),
	);
	const y = Math.floor(
		// eslint-disable-next-line no-mixed-operators
		(screenSize.height + screenSize.y) / 2 - (windowSize.height ?? 0) / 2,
	);

	return {
		x,
		y,
		width: windowSize.width ?? 0,
		height: windowSize.height ?? 0,
	};
};

/**
Center a window on the screen.
*/
const centerWindow = (options?: CenterWindowOptions) => {
	options = {
		window: activeWindow() ?? undefined,
		animated: false,
		...options,
	};

	const bounds = getWindowBoundsCentered(options);
	// TODO: Check for undefined
	options.window!.setBounds(bounds, options.animated);
};

export {
	menuBarHeight,
	getWindowBoundsCentered,
	centerWindow,
	type CenterWindowOptions,
	type GetWindowBoundsCenteredOptions,
};
