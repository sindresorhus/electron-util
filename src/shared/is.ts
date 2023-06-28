import process from 'process';
import isDev from 'electron-is-dev';
import {isUsingAsar} from '../main/is-using-asar';

/*
Check for various things.
*/
type Is = {
	/**
	Running on macOS.
	*/
	readonly macos: boolean;

	/**
	Running on Linux.
	*/
	readonly linux: boolean;

	/**
	Running on Windows.
	*/
	readonly windows: boolean;

	/**
	Running on the [main process](https://electronjs.org/docs/tutorial/quick-start/#main-process).
	*/
	readonly main: boolean;

	/**
	Running on the [renderer process](https://electronjs.org/docs/tutorial/quick-start/#renderer-process).
	*/
	readonly renderer: boolean;

	/**
	The app is using [ASAR](https://electronjs.org/docs/tutorial/application-packaging/).
	*/
	readonly usingAsar: boolean;

	/**
	Running in development, not in production.
	*/
	readonly development: boolean;

	/**
	The app is an Mac App Store build.
	*/
	readonly macAppStore: boolean;

	/**
	The app is a Windows Store AppX build.
	*/
	readonly windowsStore: boolean;
};

const is: Is = {
	macos: process.platform === 'darwin',
	linux: process.platform === 'linux',
	windows: process.platform === 'win32',
	main: process.type === 'browser',
	renderer: process.type === 'renderer',
	// TODO: This runs in main
	usingAsar: isUsingAsar,
	development: isDev,
	macAppStore: process.mas === true,
	windowsStore: process.windowsStore === true,
};

export {is};
