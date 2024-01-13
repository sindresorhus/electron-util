# electron-util

> Useful utilities for Electron apps and modules

You can use this package directly in both the [main and renderer process](https://www.electronjs.org/docs/latest/tutorial/quick-start/#main-process).

There are three parts of this package, “shared”, “main”, and “node”. The “shared” part works in both the main or [rendered process](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process). The “main” part works only in the [main process](https://www.electronjs.org/docs/latest/tutorial/quick-start/#run-the-main-process). The “node” part is for Node.js-only APIs (not Electron).

To use features from the “main” part in the renderer process, you will need to set up [IPC channels](https://www.electronjs.org/docs/latest/tutorial/ipc).

## Install

```sh
npm install electron-util
```

> [!NOTE]
> Requires Electron 28 or later.

## Usage

The “shared” API you can access directly:

```ts
import {is} from 'electron-util';

console.log(is.macos && is.main);
//=> true
```

For the “main” API, use the `/main` sub-export:

```ts
import {isDev} from 'electron-util/main';

console.log(isDev);
//=> false
```

## API

[Documentation](https://tsdocs.dev/docs/electron-util)

## Related

- [electron-store](https://github.com/sindresorhus/electron-store) - Save and load data like user preferences, app state, cache, etc
- [electron-debug](https://github.com/sindresorhus/electron-debug) - Adds useful debug features to your Electron app
- [electron-context-menu](https://github.com/sindresorhus/electron-context-menu) - Context menu for your Electron app
- [electron-dl](https://github.com/sindresorhus/electron-dl) - Simplified file downloads for your Electron app
- [electron-unhandled](https://github.com/sindresorhus/electron-unhandled) - Catch unhandled errors and promise rejections in your Electron app
