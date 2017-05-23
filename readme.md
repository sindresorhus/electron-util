# electron-util [![Build Status](https://travis-ci.org/sindresorhus/electron-util.svg?branch=master)](https://travis-ci.org/sindresorhus/electron-util)

> Useful utilities for developing Electron apps and modules

Just an opinionated collection of things I often need when using Electron.

**Don't use this yet.**


## Install

```
$ npm install electron-util
```


## Usage

```js
const {appReady, is} = require('electron-util');

(async () => {
	await appReady;

	console.log(is.main);
	//=> true
})();
```


## API

[Read the code.](index.js)


## Related

- [electron-config](https://github.com/sindresorhus/electron-config) - Simple config handling for your Electron app or module
- [electron-debug](https://github.com/sindresorhus/electron-debug) - Adds useful debug features to your Electron app
- [electron-context-menu](https://github.com/sindresorhus/electron-context-menu) - Context menu for your Electron app
- [electron-dl](https://github.com/sindresorhus/electron-dl) - Simplified file downloads for your Electron app
- [electron-unhandled](https://github.com/sindresorhus/electron-unhandled) - Catch unhandled errors and promise rejections in your Electron app


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
