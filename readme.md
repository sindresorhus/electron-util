# electron-util

> Useful utilities for Electron apps and modules

You can use this module directly in both the [main and renderer process](https://electronjs.org/docs/tutorial/quick-start/#main-process).

## Install

```
$ npm install electron-util
```

*Requires Electron 5 or later.*

## Usage

```js
const {is} = require('electron-util');

console.log(is.macos && is.main);
//=> true
```

## API

###### Contents

- [`api`](#api-1)
- [`is`](#is)
- [`electronVersion`](#electronversion)
- [`chromeVersion`](#chromeversion)
- [`platform()`](#platformchoices)
- [`activeWindow()`](#activewindow)
- [`runJS()`](#runjscode-window)
- [`fixPathForAsarUnpack()`](#fixpathforasarunpackpath)
- [`enforceMacOSAppLocation()`](#enforcemacosapplocation-macos)
- [`menuBarHeight()`](#menubarheight-macos)
- [`getWindowBoundsCentered()`](#getwindowboundscenteredoptions)
- [`centerWindow()`](#centerwindowoptions)
- [`disableZoom()`](#disablezoomwindow)
- [`appLaunchTimestamp`](#applaunchtimestamp)
- [`isFirstAppLaunch()`](#isfirstapplaunch)
- [`darkMode`](#darkmode)
- [`setContentSecurityPolicy`](#setcontentsecuritypolicypolicy-options)
- [`openNewGitHubIssue()`](#opennewgithubissueoptions)
- [`openUrlMenuItem()`](#openurlmenuitemoptions)
- [`showAboutWindow()`](#showaboutwindowoptions)
- [`aboutMenuItem()`](#aboutmenuitemoptions-linux-windows)
- [`debugInfo()`](#debuginfo)
- [`appMenu()`](#appmenumenuitems-macos)
- [`openSystemPreferences()`](#opensystempreferencespanel-section-promise-macos)

### api

Type: `object`

Access the Electron APIs in both the main and renderer process without having to care about which one you're in.

For example, in the renderer process:

```js
api.app.quit();
```

The `app` API is usually only available in the main process.

### is

Type: `object`

Check for various things:

- `macos` - Running on macOS
- `linux` - Running on Linux
- `windows` - Running on Windows
- `main` - Running on the [main process](https://electronjs.org/docs/tutorial/quick-start/#main-process)
- `renderer` - Running on the [renderer process](https://electronjs.org/docs/tutorial/quick-start/#renderer-process)
- `development` - Running in development, not in production
- `usingAsar` - The app is using [ASAR](https://electronjs.org/docs/tutorial/application-packaging/)
- `macAppStore` - The app is an Mac App Store build
- `windowsStore` - The app is a Windows Store AppX build

### electronVersion

Type: `string`\
Example: `'1.7.9'`

Electron version.

### chromeVersion

Type: `string`\
Example: `'62.0.3202'`

Chrome version in Electron.

### platform(choices)

Type: `Function`

Accepts an object with the keys as either `macos`, `windows`, `linux`, or `default`, and picks the appropriate key depending on the current platform. If no platform key is matched, the `default` key is used if it exists. If the value is a function, it will be executed, and the returned value will be used.

```js
init({
	enableUnicorn: util.platform({
		macos: true,
		windows: false,
		linux: () => false
	})
});
```

### activeWindow()

Type: `Function`

Returns the active window.

### runJS(code, window?)

Type: `Function`

Run some JavaScript in the active or given window.

Returns a promise for the result of the executed code or a rejected promise if the result is a rejected promise.

### fixPathForAsarUnpack(path)

Type: `Function`

ASAR is great, but it has [limitations when it comes to executing binaries](https://electronjs.org/docs/tutorial/application-packaging/#executing-binaries-inside-asar-archive). For example, [`child_process.spawn()` is not automatically handled](https://github.com/electron/electron/issues/9459). So you would have to unpack the binary, for example, with the [`asarUnpack`](https://www.electron.build/configuration/configuration#configuration-asarUnpack) option in `electron-builder`. This creates a problem as the path to the binary changes, but your `path.join(__dirname, 'binary')` is not changed. To make it work you need to fix the path. That's the purpose of this method.

Before:

```
/Users/sindresorhus/Kap.app/Contents/Resources/app.asar/node_modules/foo/binary
```

After:

```
/Users/sindresorhus/Kap.app/Contents/Resources/app.asar.unpacked/node_modules/foo/binary
```

### enforceMacOSAppLocation() <sup>*macOS*</sup>

Type: `Function`

On macOS, for [security reasons](https://github.com/potionfactory/LetsMove/issues/56), if an app is launched outside the Applications folder, it will run in a read-only disk image, which could cause subtle problems for your app. Use this method to ensure the app lives in the Applications folder.

It must not be used until the `app.whenReady()` promise is resolved.

It will be a no-op during development and on other systems than macOS.

It will offer to automatically move the app for the user:

<img src="https://user-images.githubusercontent.com/170270/34966593-3a0458c8-fa5d-11e7-805b-08bf80237e77.png" width="544">

### menuBarHeight() <sup>*macOS*</sup>

Returns the height of the menu bar on macOS, or `0` if not macOS.

### getWindowBoundsCentered(options?)

Get the [bounds](https://electronjs.org/docs/api/browser-window#wingetbounds) of a window as if it was centered on the screen.

#### options

Type: `object`

##### window

Type: [`BrowserWindow`](https://electronjs.org/docs/api/browser-window)\
Default: Current window

The window to get the bounds of.

##### size

Type: `object`\
Default: Size of `window`

Set a new window size. Example: `{width: 600, height: 400}`

##### useFullBounds

Type: `boolean`\
Default: `false`

Use the full display size when calculating the position. By default, only the workable screen area is used, which excludes the Windows taskbar and macOS dock.

### centerWindow(options?)

Center a window on the screen.

#### options

Type: `object`

##### window

Type: [`BrowserWindow`](https://electronjs.org/docs/api/browser-window)\
Default: Current window

The window to center.

##### size

Type: `object`\
Default: Size of `window`

Set a new window size. Example: `{width: 600, height: 400}`

##### animated

Type: `boolean`\
Default: `false`

Animate the change.

##### useFullBounds

Type: `boolean`\
Default: `false`

Use the full display size when calculating the position. By default, only the workable screen area is used, which excludes the Windows taskbar and macOS dock.

### disableZoom([window])

Disable zooming, usually caused by pinching the trackpad on macOS or <kbd>Ctrl</kbd> <kbd>+</kbd> on Windows.

#### window

Type: [`BrowserWindow`](https://electronjs.org/docs/api/browser-window)\
Default: Current window

### appLaunchTimestamp

Type: `number`

A timestamp (`Date.now()`) of when your app launched.

### isFirstAppLaunch()

Returns a `boolean` of whether it's the first time your app is launched.

It works by writing a file to `app.getPath('userData')` if it doesn't exist and checks that. That means it will return true the first time you add this check to your app.

### darkMode

*Requires Electron 7*

Type: `object`

```js
const {darkMode} = require('electron-util');

console.log(darkMode.isEnabled);
//=> false

darkMode.onChange(() => {
	console.log(darkMode.isEnabled);
	//=> true
});
```

#### isEnabled

Type: `boolean`

Whether the macOS dark mode is enabled.

On Windows and Linux, it's `false`.

#### onChange(callback)

The `callback` function is called when the macOS dark mode is toggled.

Returns a function, that when called, unsubscribes the listener.

Calling it on Window and Linux works, but it just returns a no-op function.

### setContentSecurityPolicy(policy, options?)

Set a [Content Security Policy](https://developers.google.com/web/fundamentals/security/csp/) for your app.

Don't forget to [validate the policy](https://csp-evaluator.withgoogle.com) after changes.

```js
const {setContentSecurityPolicy} = require('electron-util');

setContentSecurityPolicy(`
	default-src 'none';
	script-src 'self';
	img-src 'self' data:;
	style-src 'self';
	font-src 'self';
	connect-src 'self' https://api.example.com;
	base-uri 'none';
	form-action 'none';
	frame-ancestors 'none';
`);
```

#### policy

Type: `string`

You can put rules on separate lines, but lines must end in a semicolon.

#### options

Type: `object`

##### session

Type: [`Session`](https://electronjs.org/docs/api/session)\
Default: [`electron.session.defaultSession`](https://electronjs.org/docs/api/session#sessiondefaultsession)

The session to apply the policy to.

### openNewGitHubIssue(options)

Opens the new issue view on the given GitHub repo in the browser. Optionally, with some fields like title and body prefilled. The options are passed to the [`new-github-issue-url`](https://github.com/sindresorhus/new-github-issue-url#options) package.

```js
const {openNewGitHubIssue} = require('electron-util');

openNewGitHubIssue({
	user: 'sindresorhus',
	repo: 'playground',
	body: 'Hello'
});
```

### openUrlMenuItem(options)

Accepts the same options as [`new MenuItem()`](https://electronjs.org/docs/api/menu-item) in addition to a `url` option.

If you specify the `click` option, its handler will be called before the URL is opened.

Returns a `MenuItemConstructorOptions` that creates a menu item, which opens the given URL in the browser when clicked.

```js
const {Menu} = require('electron');
const {openUrlMenuItem} = require('electron-util');

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
```

### showAboutWindow(options)

Shows an 'About' window. On macOS and Linux, the native 'About' window is shown, and on Windows, a simple custom dialog is shown.

On macOS, the `icon`, `text`, `title`, and `website` options are ignored. For `icon`, it already defaults to the app icon. For `title`, you don't need it as the native about window doesn't have a title.

On Linux, the `text` option is ignored.

*It will show `Electron` as the app name until you build your app for production.*

<img src="media/screenshot-about-window-linux.png" width="405" height="289" alt="The about window on Ubuntu">

```js
const {showAboutWindow} = require('electron-util');

showAboutWindow({
	icon: path.join(__dirname, 'static/Icon.png'),
	copyright: 'Copyright © Sindre Sorhus',
	text: 'Some more info.'
});
```

#### options

Type: `object`

##### icon <sup>*Linux*</sup> <sup>*Windows*</sup>

Type: `string`

An absolute path to the app icon.

##### copyright

Type: `string`

The copyright text.

##### website <sup>*Linux*</sup>

Type: `string`

The URL to the app's website.

##### text <sup>*Windows*</sup>

Type: `string`

Some additional text if needed.

##### title <sup>*Linux*</sup> <sup>*Windows*</sup>

Type: `string`\
Default: `'About'`

Customizable for localization. Used in the menu item label and window title (Windows-only).

The app name is automatically appended at runtime.

### aboutMenuItem(options) <sup>*Linux*</sup> <sup>*Windows*</sup>

Accepts the same options as `.showAboutWindow()`.

Returns a `MenuItemConstructorOptions` that creates a menu item, which shows the about dialog when clicked.

```js
const {Menu} = require('electron');
const {aboutMenuItem} = require('electron-util');

const menu = Menu.buildFromTemplate([
	{
		label: 'Help',
		submenu: [
			aboutMenuItem({
				icon: path.join(__dirname, 'static/Icon.png'),
				copyright: 'Copyright © Sindre Sorhus',
				text: 'Some more info.'
			})
		]
	}
]);

Menu.setApplicationMenu(menu);
```

### debugInfo()

Returns a string with debug info suitable for inclusion in bug reports.

For example, use this in the `body` option of the `.openNewGitHubIssue()` method.

```js
const {debugInfo} = require('electron-util');

console.log(debugInfo());
/*
AppName 2.21.0
Electron 3.0.6
darwin 18.2.0
Locale: en-US
*/
```

### appMenu([menuItems]) <sup>*macOS*</sup>

Creating the [app menu](https://developer.apple.com/design/human-interface-guidelines/macos/menus/menu-bar-menus/) (the first menu) on macOS requires [a lot of boilerplate](https://github.com/sindresorhus/caprine/blob/5361289d1058b9463946f274cbfef587e6ad24a3/menu.js#L381-L431). This method includes the default boilerplate and lets you add additional menu items in the correct place.

#### menuItems

Type: [`MenuItem[]`](https://electronjs.org/docs/api/menu-item)

Menu items to add below the `About App Name` menu item.

Usually, you would add at least a `Preferences…` menu item:

```js
const {Menu} = require('electron');
const {appMenu} = require('electron-util');

const menu = Menu.buildFromTemplate([
	appMenu([
		{
			label: 'Preferences…',
			accelerator: 'Command+,',
			click() {}
		}
	])
]);

Menu.setApplicationMenu(menu);
```

### openSystemPreferences(panel?, section?): Promise<void> <sup>*macOS*</sup>

Type: `Function`

Open the System Preferences on macOS.

This method does nothing on other systems.

Optionally provide a pane and section. A list of available options can be found [here](https://github.com/sindresorhus/electron-util/blob/4215b51e741b7ea50a0637abe919e2e7d61b34ac/index.d.ts#L515-L561).

#### pane

Type: `string`

Which pane of the System Preferences to open.

```js
const {openSystemPreferences} = require('electron-util');

openSystemPreferences('security');
```

#### section

Type: `string`

Optional section within the pane.

```js
const {openSystemPreferences} = require('electron-util');

openSystemPreferences('security', 'Firewall');
```

## Node.js API

This is for non-Electron code that might be included in an Electron app. For example, if you want to add special support for Electron in a vanilla Node.js module.

```js
const electronUtil = require('electron-util/node');

if (electronUtil.isElectron) {
	// Electron workaround
} else {
	// Normal code
}
```

### isElectron

Type: `boolean`

Check if you're running in an Electron app.

### electronVersion

Type: `string`\
Example: `'1.7.9'`

Electron version. Returns `0.0.0` when not in an Electron app.

### isUsingAsar

Type: `boolean`

Check if the Electron app you're running in is using [ASAR](https://electronjs.org/docs/tutorial/application-packaging/).

### fixPathForAsarUnpack(path)

Same as the above Electron version.

## Related

- [electron-store](https://github.com/sindresorhus/electron-store) - Save and load data like user preferences, app state, cache, etc
- [electron-debug](https://github.com/sindresorhus/electron-debug) - Adds useful debug features to your Electron app
- [electron-context-menu](https://github.com/sindresorhus/electron-context-menu) - Context menu for your Electron app
- [electron-dl](https://github.com/sindresorhus/electron-dl) - Simplified file downloads for your Electron app
- [electron-unhandled](https://github.com/sindresorhus/electron-unhandled) - Catch unhandled errors and promise rejections in your Electron app
