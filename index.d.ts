import {AllElectron, Remote, BrowserWindow, Size, Rectangle, Session, MenuItemConstructorOptions, MenuItem} from 'electron';

/**
 * Access the Electron APIs in both the main and renderer process without having to care about which one you're in.
 *
 * @example
 *
 * // In the renderer process:
 * api.app.quit(); // The `app` API is usually only available in the main process.
 */
export const api: AllElectron | Remote;

/**
 * Check for various things.
 */
export const is: {
	/**
	 * Running on macOS.
	 */
	readonly macos: boolean,

	/**
	 * Running on Linux.
	 */
	readonly linux: boolean,

	/**
	 * Running on Windows.
	 */
	readonly windows: boolean,

	/**
	 * Running on the [main process](https://electronjs.org/docs/tutorial/quick-start/#main-process).
	 */
	readonly main: boolean,

	/**
	 * Running on the [renderer process](https://electronjs.org/docs/tutorial/quick-start/#renderer-process).
	 */
	readonly renderer: boolean,

	/**
	 * The app is using [ASAR](https://electronjs.org/docs/tutorial/application-packaging/).
	 */
	readonly usingAsar: boolean,

	/**
	 * Running in development, not in production.
	 */
	readonly development: boolean,

	/**
	 * The app is an Mac App Store build.
	 */
	readonly macAppStore: boolean,

	/**
	 * The app is a Windows Store AppX build.
	 */
	readonly windowsStore: boolean
};

/**
 * Electron version.
 *
 * @example
 *
 * '1.7.9'
 */
export const electronVersion: string;

/**
 * Chrome version in Electron.
 *
 * @example
 *
 * '62.0.3202'
 */
export const chromeVersion: string;

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
	Pick<T, Exclude<keyof T, Keys>>
	& {
		[K in Keys]-?: Required<Pick<T, K>>
	}[Keys]

interface _Choices<Macos, Windows, Linux, Default> {
	readonly macos?: Macos | (() => Macos);
	readonly windows?: Windows | (() => Windows);
	readonly linux?: Linux | (() => Linux);
	readonly default?: Default | (() => Default);
}

export type Choices<Macos, Windows, Linux, Default> = RequireAtLeastOne<_Choices<Macos, Windows, Linux, Default>, 'macos' | 'windows' | 'linux'>

/**
 * Accepts an object with the keys as either `macos`, `windows`, `linux`, or `default`, and picks the appropriate key depending on the current platform.
 * If no platform key is matched, the `default` key is used if it exists.
 * If the value is a function, it will be executed, and the returned value will be used.
 *
 * @param choices - TODO
 *
 * @example
 *
 * init({
 * 	enableUnicorn: util.platform({
 * 		macos: true,
 * 		windows: false,
 * 		linux: () => false
 * 	})
 * });
 */
export function platform<Macos = never, Windows = never, Linux = never, Default = undefined>(choices: Choices<Macos, Windows, Linux, Default>): Macos | Windows | Linux | Default;

/**
 * Returns the active window.
 */
export function activeWindow(): BrowserWindow;

/**
 * Run some JavaScript in the active or given window.
 *
 * @param code - TODO
 * @param window - Default: Current window
 * @returns A promise for the result of the executed code or a rejected promise if the result is a rejected promise.
 */
export function runJS(code: string, window?: BrowserWindow): Promise<unknown>;

/**
 * ASAR is great, but it has [limitations when it comes to executing binaries](https://electronjs.org/docs/tutorial/application-packaging/#executing-binaries-inside-asar-archive).
 * For example, [`child_process.spawn()` is not automatically handled](https://github.com/electron/electron/issues/9459).
 * So you would have to unpack the binary, for example, with the [`asarUnpack`](https://www.electron.build/configuration/configuration#configuration-asarUnpack) option in `electron-builder`.
 * This creates a problem as the path to the binary changes, but your `path.join(__dirname, 'binary')` is not changed.
 * To make it work you need to fix the path. That's the purpose of this method.
 *
 * Before:
 * /Users/sindresorhus/Kap.app/Contents/Resources/app.asar/node_modules/foo/binary
 *
 * After:
 * /Users/sindresorhus/Kap.app/Contents/Resources/app.asar.unpack/node_modules/foo/binary
 *
 * @param path - TODO
 * @returns TODO
 */
export function fixPathForAsarUnpack(path: string): string;

/**
 * On macOS, for [security reasons](https://github.com/potionfactory/LetsMove/issues/56), if an app is launched outside the Applications folder, it will run in a read-only disk image, which could cause subtle problems for your app.
 * Use this method to ensure the app lives in the Applications folder.
 *
 * It must not be used until the `app.on('ready')` event has been emitted.
 *
 * It will be a no-op during development and on other systems than macOS.
 *
 * It will offer to automatically move the app for the user.
 */
export function enforceMacOSAppLocation(): void;

/**
 * @returns The height of the menu bar on macOS, or `0` if not macOS.
 */
export function menuBarHeight(): number;

export interface GetWindowBoundsCenteredOptions {
	/**
	 * The window to get the bounds of.
	 *
	 * Default: Current window
	 */
	readonly window?: BrowserWindow;

	/**
	 * Set a new window size.
	 *
	 * Default: Size of `window`
	 *
	 * @example
	 *
	 * {width: 600, height: 400}
	 */
	readonly size?: Size;
}

/**
 * Get the [bounds](https://electronjs.org/docs/api/browser-window#wingetbounds) of a window as if it was centered on the screen.
 *
 * @returns TODO
 */
export function getWindowBoundsCentered(options?: GetWindowBoundsCenteredOptions): Rectangle;

export interface OptionalRectangle {
	/**
	 * The height of the rectangle (must be an integer).
	 */
	readonly height?: number;

	/**
	 * The width of the rectangle (must be an integer).
	 */
	readonly width?: number;

	/**
	 * The x coordinate of the origin of the rectangle (must be an integer).
	 */
	readonly x?: number;

	/**
	 * The y coordinate of the origin of the rectangle (must be an integer).
	 */
	readonly y?: number;
}

export interface SetWindowBoundsOptions {
	/**
	 * The window to set the bounds of.
	 *
	 * Default: Current window
	 */
	readonly window?: BrowserWindow;

	/**
	 * Animate the change.
	 *
	 * @default false
	 */
	readonly animated?: boolean;
}

/**
 * Set the bounds of a window. This is similar to the [`BrowserWindow#setBounds()`](https://electronjs.org/docs/api/browser-window#winsetboundsbounds-animate) method, but it allows setting any of the `x`, `y`, `width`, `height` properties, instead of forcing you to set them all at once.
 * The properties that are not set will just fall back to the current ones.
 *
 * @param bounds - TODO
 */
export function setWindowBounds(bounds: OptionalRectangle, options?: SetWindowBoundsOptions): void;

export interface CenterWindowOptions {
	/**
	 * The window to center.
	 *
	 * Default: Current window
	 */
	readonly window?: BrowserWindow;

	/**
	 * Set a new window size.
	 *
	 * Default: Size of `window`
	 *
	 * @example
	 *
	 * {width: 600, height: 400}
	 */
	readonly size?: Size;

	/**
	 * Animate the change.
	 *
	 * @default false
	 */
	readonly animated?: boolean;
}

/**
 * Center a window on the screen.
 */
export function centerWindow(options?: CenterWindowOptions): void;

/**
 * Disable zooming, usually caused by pinching the trackpad on macOS or Ctrl+ on Windows.
 *
 * @param window - Default: Current window
 */
export function disableZoom(window?: BrowserWindow): void;

/**
 * A timestamp (`Date.now()`) of when your app launched.
 */
export const appLaunchTimestamp: number;

/**
 * It works by writing a file to `app.getPath('userData')` if it doesn't exist and checks that.
 * That means it will return true the first time you add this check to your app.
 *
 * @returns A `boolean` of whether it's the first time your app is launched.
 */
export function isFirstAppLaunch(): boolean;

export interface DarkMode {
	/**
	 * Whether the macOS dark mode is enabled.
	 * On Windows and Linux, it's `false`.
	 */
	readonly isEnabled: boolean;

	/**
	 * The `callback` function is called when the macOS dark mode is toggled.
	 *
	 * @returns A function, that when called, unsubscribes the listener. Calling it on Window and Linux works, but it just returns a no-op function.
	 */
	readonly onChange: (callback: () => void) => () => void;
}

/**
 *
 * @example
 *
 * import {darkMode} from 'electron-util';
 * console.log(darkMode.isEnabled);
 * //=> false
 *
 * darkMode.onChange(() => {
 * 	console.log(darkMode.isEnabled);
 * 	//=> true
 * });
 */
export const darkMode: DarkMode;

export interface SetContentSecurityPolicyOptions {
	/**
	 * The session to apply the policy to.
	 *
	 * Default: [`electron.session.defaultSession`](https://electronjs.org/docs/api/session#sessiondefaultsession)
	 */
	readonly session?: Session;
}

/**
 * Set a [Content Security Policy](https://developers.google.com/web/fundamentals/security/csp/) for your app.
 * Don't forget to [validate the policy](https://csp-evaluator.withgoogle.com) after changes.
 *
 * @param policy - You can put rules on separate lines, but lines must end in a semicolon.
 *
 * @example
 *
 * import setContentSecurityPolicy from 'electron-util';
 *
 * setContentSecurityPolicy(`
 * 	default-src 'none';
 * 	script-src 'self';
 * 	img-src 'self' data:;
 * 	style-src 'self';
 * 	font-src 'self';
 * 	connect-src 'self' https://api.example.com;
 * 	base-uri 'none';
 * 	form-action 'none';
 * 	frame-ancestors 'none';
 * `);
 */
export function setContentSecurityPolicy(policy: string, options?: SetContentSecurityPolicyOptions): void;

/**
 * Opens the new issue view on the given GitHub repo in the browser.
 * Optionally, with some fields like title and body prefilled.
 *
 * @param options - The options are passed to the [`new-github-issue-url`](https://github.com/sindresorhus/new-github-issue-url#options) package.
 *
 * @example
 *
 * import {openNewGitHubIssue} from 'electron-util';
 *
 * openNewGitHubIssue({
 * 	user: 'sindresorhus',
 * 	repo: 'playground',
 * 	body: 'Hello'
 * });
 */
// TODO options type?
export function openNewGitHubIssue(options: unknown): void;

export interface OpenUrlMenuItemOptions extends Readonly<MenuItemConstructorOptions> {
	/**
	 * TODO
	 */
	readonly url: string;
}

/**
 * Accepts the same options as [`new MenuItem()`](https://electronjs.org/docs/api/menu-item) in addition to a `url` option.
 * If you specify the `click` option, its handler will be called before the URL is opened.
 *
 * @returns A `MenuItem` that, when clicked, opens the given URL in the browser.
 *
 * @example
 *
 * import {Menu} from 'electron';
 * import {openUrlMenuItem} from 'electron-util';
 *
 * const menu = Menu.buildFromTemplate([
 * 	{
 * 		label: 'Help',
 * 		submenu: [
 * 			openUrlMenuItem({
 * 				label: 'Website',
 * 				url: 'https://sindresorhus.com'
 * 			})
 * 		]
 * 	}
 * ]);
 *
 * Menu.setApplicationMenu(menu);
 */
export function openUrlMenuItem(options?: OpenUrlMenuItemOptions): MenuItem;

export interface ShowAboutWindowOptions {
	/**
	 * An absolute path to the app icon.
	 */
	readonly icon?: string;

	/**
	 * The copyright text.
	 */
	readonly copyright?: string;

	/**
	 * Some additional text if needed.
	 */
	readonly text?: string;

	/**
	 * Customizable for localization. Used in the menu item label and window title.
	 * The app name is automatically appended at runtime.
	 *
	 * @default 'about'
	 */
	readonly title?: string;
}

/**
 * Shows an 'About' window. On macOS, the native 'About' window is shown, and on Linux and Windows, a simple custom dialog is shown.
 * On macOS, the `icon`, `text`, and `title` options are ignored.
 *
 * *It will show `Electron` as the app name until you build your app for production.*
 *
 * @param options
 *
 * @example
 *
 * import {showAboutWindow} from 'electron-util';
 *
 * showAboutWindow({
 * 	icon: path.join(__dirname, 'static/Icon.png'),
 * 	copyright: 'Copyright © Sindre Sorhus',
 * 	text: 'Some more info.'
 * });
 */
export function showAboutWindow(options: ShowAboutWindowOptions): void;

export interface AboutMenuItemOptions extends ShowAboutWindowOptions {}

/**
 * Accepts the same options as `.showAboutWindow()`.
 *
 * @returns A `MenuItem` that, when clicked, shows the about dialog.
 *
 * @example
 *
 * import {Menu} from 'electron';
 * import {aboutMenuItem} from 'electron-util';
 *
 * const menu = Menu.buildFromTemplate([
 * 	{
 * 		label: 'Help',
 * 		submenu: [
 * 			aboutMenuItem({
 * 				icon: path.join(__dirname, 'static/Icon.png'),
 * 				copyright: 'Copyright © Sindre Sorhus',
 * 				text: 'Some more info.'
 * 			})
 * 		]
 * 	}
 * ]);
 *
 * Menu.setApplicationMenu(menu);
 */
export function aboutMenuItem(options?: AboutMenuItemOptions): MenuItem;

/**
 * For example, use this in the `body` option of the `.openNewGitHubIssue()` method.
 *
 * @returns A string with debug info suitable for inclusion in bug reports.
 *
 * @example
 *
 * import {debugInfo} from 'electron-util';
 *
 * console.log(debugInfo());
 * // AppName 2.21.0
 * // Electron 3.0.6
 * // darwin 18.2.0
 * // Locale: en-US
 */
export function debugInfo(): string;

/**
 * Creating the [app menu](https://developer.apple.com/design/human-interface-guidelines/macos/menus/menu-bar-menus/) (the first menu) on macOS requires [a lot of boilerplate](https://github.com/sindresorhus/caprine/blob/5361289d1058b9463946f274cbfef587e6ad24a3/menu.js#L381-L431).
 * This method includes the default boilerplate and lets you add additional menu items in the correct place.
 *
 * @param menuItems - Menu items to add below the `About App Name` menu item. Usually, you would add at least a `Preferences…` menu item.
 * @returns TODO
 *
 * @example
 *
 * import {Menu} from 'electron';
 * import {appMenu} from 'electron-util';
 *
 * const menu = Menu.buildFromTemplate([
 *  appMenu([
 * 	 {
 * 		 label: 'Preferences…',
 * 		 accelerator: 'Command+,',
 * 		 click() {}
 * 	 }
 *  ])
 * ]);
 *
 * Menu.setApplicationMenu(menu);
 */
export function appMenu(menuItems?: Readonly<MenuItemConstructorOptions[]>): MenuItemConstructorOptions;
