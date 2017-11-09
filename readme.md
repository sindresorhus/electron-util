# electron-util [![Build Status](https://travis-ci.org/sindresorhus/electron-util.svg?branch=master)](https://travis-ci.org/sindresorhus/electron-util)

> Useful utilities for developing Electron apps and modules

You can use this module directly in both the [main and renderer process](https://electron.atom.io/docs/tutorial/quick-start/#main-process).


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

Access some Electron APIs in both main and renderer process without having to care about which one you're in:

- [`app`](https://electron.atom.io/docs/api/app/)
- [`BrowserWindow`](https://electron.atom.io/docs/api/browser-window/)
- [`dialog`](https://electron.atom.io/docs/api/dialog/)

### is

Type: `Object`

Check for various things:

- `macos` - Running on macOS
- `linux` - Running on Linux
- `windows` - Running on Windows
- `main` - Running on the [main process](https://electron.atom.io/docs/tutorial/quick-start/#main-process)
- `renderer` - Running on the [renderer process](https://electron.atom.io/docs/tutorial/quick-start/#renderer-process)
- `usingAsar` - The app is using [ASAR](https://electron.atom.io/docs/tutorial/application-packaging/).
- `development` - Running in development, not in production
- `macAppStore` - The app is an Mac App Store build
- `windowsStore` - The app is a Windows Store AppX build

### appReady

Type: `Promise`

Resolves when the [app is ready](https://electron.atom.io/docs/api/app/#event-ready).

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

Accepts an object with the keys as either `macos`, `windows`, `linux`, or `default`, and picks the appropriate key depending on the current platform. If platform key is matched, the `default` key is used if it exists. If the value is a function, it will be executed, and the returned value will be used.

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

### runJS(code, [window])

Type: `Function`

Run some JavaScript in the active or given window.

Returns a promise for the result of the executed code or a rejected promise if the result is a rejected promise.

### fixPathForAsarUnpack(path)

Type: `Function`

ASAR is great, but it has [limitations when it comes to executing binaries](https://electron.atom.io/docs/tutorial/application-packaging/#executing-binaries-inside-asar-archive). For example, [`child_process.spawn()` is not automatically handled](https://github.com/electron/electron/issues/9459). So you would have to unpack the binary, for example, with the [`asarUnpack`](https://www.electron.build/configuration/configuration#configuration-asarUnpack) option in `electron-builder`. This creates a problem as the path to the binary changes, but your `path.join(__dirname, 'binary')` is not changed. To make it work you need to fix the path. That's the purpose of this method.

Before:

```
/Users/sindresorhus/Kap.app/Contents/Resources/app.asar/node_modules/foo/binary
```

After:

```
/Users/sindresorhus/Kap.app/Contents/Resources/app.asar.unpack/node_modules/foo/binary
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

Type: `string`<br>
Example: `1.7.9`

Electron version. Returns `0.0.0` when not in an Electron app.

### isUsingAsar

Type: `boolean`

Check if the Electron app you're running in is using [ASAR](https://electron.atom.io/docs/tutorial/application-packaging/).

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
