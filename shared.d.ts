import {BrowserWindow, MenuItemConstructorOptions} from 'electron';
import {Options as NewGithubIssueUrlOptions} from 'new-github-issue-url';
import {RequireAtLeastOne} from 'type-fest';

/*
Check for various things.
*/
export const is: {
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

/**
80,116d28
Chrome version in Electron.

@example
```
'62.0.3202'
```
*/
export const chromeVersion: string;

// eslint-disable-next-line @typescript-eslint/naming-convention
interface _Choices<Macos, Windows, Linux, Default> {
	readonly macos?: Macos | (() => Macos);
	readonly windows?: Windows | (() => Windows);
	readonly linux?: Linux | (() => Linux);
	readonly default?: Default | (() => Default);
}

export type Choices<Macos, Windows, Linux, Default> = RequireAtLeastOne<_Choices<Macos, Windows, Linux, Default>, 'macos' | 'windows' | 'linux'>;

/**
Accepts an object with the keys as either `macos`, `windows`, `linux`, or `default`, and picks the appropriate key depending on the current platform.
If no platform key is matched, the `default` key is used if it exists.
If the value is a function, it will be executed, and the returned value will be used.

@example
```
init({
	enableUnicorn: util.platform({
		macos: true,
		windows: false,
		linux: () => false
	})
});
```
*/
export function platform<Macos = never, Windows = never, Linux = never, Default = undefined>(choices: Choices<Macos, Windows, Linux, Default>): Macos | Windows | Linux | Default;

/**
122,130d33
Run some JavaScript in the active or given window.

@param code - JavaScript code to be executed.
@param window - Default: Current window
@returns A promise for the result of the executed code or a rejected promise if the result is a rejected promise.
*/
// eslint-disable-next-line @typescript-eslint/naming-convention
export function runJS(code: string, window?: BrowserWindow): Promise<unknown>;

/**
265,276d167
Disable zooming, usually caused by pinching the trackpad on macOS or Ctrl+ on Windows.

@param window - Default: Current window
*/
export function disableZoom(window?: BrowserWindow): void;

/**
A timestamp (`Date.now()`) of when your app launched.
*/
export const appLaunchTimestamp: number;

/**
348,399d238
/**
Opens the new issue view on the given GitHub repo in the browser.
Optionally, with some fields like title and body prefilled.

@param options - The options are passed to the [`new-github-issue-url`](https://github.com/sindresorhus/new-github-issue-url#options) package.

@example
```
import {openNewGitHubIssue} from 'electron-util';

openNewGitHubIssue({
	user: 'sindresorhus',
	repo: 'playground',
	body: 'Hello'
});
*/
export function openNewGitHubIssue(options: NewGithubIssueUrlOptions): void;

export interface OpenUrlMenuItemOptions extends Readonly<MenuItemConstructorOptions> {
	/**
	URL to be opened when the menu item is clicked.
	*/
	readonly url: string;
}

/**
Accepts the same options as [`new MenuItem()`](https://electronjs.org/docs/api/menu-item) in addition to a `url` option.
If you specify the `click` option, its handler will be called before the URL is opened.

@returns A `MenuItemConstructorOptions` that creates a menu item, which opens the given URL in the browser when clicked.

@example
```
import {Menu} from 'electron';
import {openUrlMenuItem} from 'electron-util';

const menu = Menu.buildFromTemplate([
	{
		label: 'Help',
		submenu: [
			openUrlMenuItem({
				label: 'Website',
				url: 'https://sindresorhus.com'
			})
		]
	}
]);

Menu.setApplicationMenu(menu);
*/
export function openUrlMenuItem(options?: OpenUrlMenuItemOptions): MenuItemConstructorOptions;

export interface SystemPreferencesPanes {
	universalaccess:
	| 'Captioning'
	| 'Hearing'
	| 'Keyboard'
	| 'Media_Descriptions'
	| 'Mouse'
	| 'Seeing_Display'
	| 'Seeing_VoiceOver'
	| 'Seeing_Zoom'
	| 'SpeakableItems'
	| 'Switch';
	security:
	| 'Advanced'
	| 'FDE'
	| 'Firewall'
	| 'General'
	| 'Privacy'
	| 'Privacy_Accessibility'
	| 'Privacy_Advertising'
	/**
		Full Disk Access.
		*/
	| 'Privacy_AllFiles'
	| 'Privacy_Assistive'
	| 'Privacy_Automation'
	| 'Privacy_Calendars'
	| 'Privacy_Camera'
	| 'Privacy_Contacts'
	| 'Privacy_DesktopFolder'
	| 'Privacy_Diagnostics'
	| 'Privacy_DocumentsFolder'
	| 'Privacy_DownloadsFolder'
	| 'Privacy_LocationServices'
	| 'Privacy_Microphone'
	| 'Privacy_Photos'
	| 'Privacy_Reminders'
	| 'Privacy_ScreenCapture';
	speech:
	| 'Dictation'
	| 'TTS';
	sharing:
	| 'Internet'
	| 'Services_ARDService'
	| 'Services_BluetoothSharing'
	| 'Services_PersonalFileSharing'
	| 'Services_PrinterSharing'
	| 'Services_RemoteAppleEvent'
	| 'Services_RemoteLogin'
	| 'Services_ScreenSharing';
}

/**
Open the System Preferences on macOS.

This method does nothing on other systems.

Optionally provide a pane and section.

@example
```
import {openSystemPreferences} from 'electron-util';

openSystemPreferences();

// or

openSystemPreferences('security', 'Firewall');
```

@param pane - The pane to open.
@param section - The section within that pane.
@returns A Promise that resolves when the preferences window is opened.
*/
export const openSystemPreferences: <T extends keyof SystemPreferencesPanes>(pane?: T, section?: SystemPreferencesPanes[T]) => Promise<void>;
