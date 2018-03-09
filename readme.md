# electron-util [![Build Status](https://travis-ci.org/sindresorhus/electron-util.svg?branch=master)](https://travis-ci.org/sindresorhus/electron-util)

> Useful utilities for developing Electron apps and modules

You can use this module directly in both the [main and renderer process](https://electronjs.org/docs/tutorial/quick-start/#main-process).


## Install

```
$ npm install electron-util
```


## Usage

```js
const {appReady, is} = require('electron-util');

(async () => {
	await appReady;

	console.log(is.macos && is.main);
	//=> true
})();
```


## API

### api

Type: `Object`

Access the Electron APIs in both the main and renderer process without having to care about which one you're in.

For example, in the renderer process:

```js
api.app.quit();
```

The `app` API is usually only available in the main process.

### is

Type: `Object`

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

### appReady

Type: `Promise`

Resolves when the [app is ready](https://electronjs.org/docs/api/app/#event-ready).

### appRoot

Type: `string`

Path to the root of the app.

[Read more.](https://github.com/electron/electron/issues/11561)

### electronVersion

Type: `string`<br>
Example: `1.7.9`

Electron version.

### chromeVersion

Type: `string`<br>
Example: `62.0.3202`

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

### loadFile(window, filePath)

Load a file into the given window using a file path relative to the root of the app.

```js
loadFile(win, 'index.html');
```

You use this instead of the verbose ```win.loadURL(`file://…`);```

[Read more.](https://github.com/electron/electron/issues/11560)

### runJS(code, [window])

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
/Users/sindresorhus/Kap.app/Contents/Resources/app.asar.unpack/node_modules/foo/binary
```

### enforceMacOSAppLocation() <sup>*macOS*</sup>

Type: `Function`

On macOS, for [security reasons](https://github.com/potionfactory/LetsMove/issues/56), if an app is launched outside the Applications folder, it will run in a read-only disk image, which could cause subtle problems for your app. Use this method to ensure the app lives in the Applications folder.

It must not be used until the `app.on('ready')` event has been emitted.

It will be a noop during development and on other systems than macOS.

On Electron 1.8.1, it will offer to automatically move the app for the user:

<img src="https://user-images.githubusercontent.com/170270/34966593-3a0458c8-fa5d-11e7-805b-08bf80237e77.png" width="544">

On older Electron versions, it will just warn the user:

<img src="https://user-images.githubusercontent.com/170270/34966592-39e88dbe-fa5d-11e7-8597-397a98908600.png" width="532">

### menuBarHeight() <sup>*macOS*</sup>

Returns the height of the menu bar on macOS, or `0` if not macOS.

### getWindowBoundsCentered([options])

Get the [bounds](https://electronjs.org/docs/api/browser-window#wingetbounds) of a window as if it was centered on the screen.

#### options

Type: `Object`

##### window

Type: [`BrowserWindow`](https://electronjs.org/docs/api/browser-window)<br>
Default: Current window

The window to get the bounds of.

##### size

Type: `Object`<br>
Default: Size of `window`

Set a new window size. Example: `{width: 600, height: 400}`

### setWindowBounds(bounds, [options])

Set the bounds of a window. This is similar to the [`BrowserWindow#setBounds()`](https://electronjs.org/docs/api/browser-window#winsetboundsbounds-animate) method, but it allows setting any of the `x`, `y`, `width`, `height` properties, instead of forcing you to set them all at once. The properties that are not set will just fall back to the current ones.

#### options

Type: `Object`

##### window

Type: [`BrowserWindow`](https://electronjs.org/docs/api/browser-window)<br>
Default: Current window

The window to set the bounds of.

##### animated

Type: `boolean`<br>
Default: `false`

Animate the change.

### centerWindow([options])

Center a window on the screen.

#### options

Type: `Object`

##### window

Type: [`BrowserWindow`](https://electronjs.org/docs/api/browser-window)<br>
Default: Current window

The window to center.

##### size

Type: `Object`<br>
Default: Size of `window`

Set a new window size. Example: `{width: 600, height: 400}`

##### animated

Type: `boolean`<br>
Default: `false`

Animate the change.

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

Type: `string`<br>
Example: `1.7.9`

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


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
