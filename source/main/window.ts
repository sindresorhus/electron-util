import {
	type BrowserWindow,
	type Rectangle,
	type Size,
	screen,
} from 'electron';
import {is} from '../shared/index.js';
import {activeWindow} from './active-window.js';

export type GetWindowBoundsCenteredOptions = {
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

export type CenterWindowOptions = {
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
export const menuBarHeight = (): number =>
	is.macos ? (screen.getPrimaryDisplay().workArea.y as number) : 0;

/**
Get the [bounds](https://electronjs.org/docs/api/browser-window#wingetbounds) of a window as if it was centered on the screen.

@returns Bounds of a window.
*/
export const getWindowBoundsCentered = (options?: GetWindowBoundsCenteredOptions): Rectangle => {
	const window = options?.window ?? activeWindow();
	if (!window) {
		throw new Error('No active window');
	}

	const [width, height] = (window as any).getSize() as [number, number];
	const windowSize: Size = options?.size ?? {width: width ?? 0, height: height ?? 0};
	const screenSize = (screen.getDisplayNearestPoint(screen.getCursorScreenPoint()) as any).workArea as Rectangle;
	const x = Math.floor((screenSize.x as number) + ((screenSize.width as number) / 2) - (windowSize.width / 2));
	const y = Math.floor((((screenSize.height as number) + (screenSize.y as number)) / 2) - (windowSize.height / 2));

	return {
		x,
		y,
		...windowSize,
	};
};

/**
Center a window on the screen.
*/
export const centerWindow = (options?: CenterWindowOptions): void => {
	const window = options?.window ?? activeWindow();
	if (!window) {
		throw new Error('No active window');
	}

	const resolvedOptions: CenterWindowOptions & {window: BrowserWindow} = {
		window,
		animated: false,
		...options,
	};

	const bounds = getWindowBoundsCentered(resolvedOptions);
	(window as any).setBounds(bounds, resolvedOptions.animated ?? false);
};
