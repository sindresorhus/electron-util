# electron-util

> Useful utilities for Electron apps and modules

You can use this module directly in both the [main and renderer process](https://electronjs.org/docs/tutorial/quick-start/#main-process).

There are two parts of the module, `main` and `shared`. The main part only works in the [main process](https://www.electronjs.org/docs/latest/tutorial/quick-start/#run-the-main-process) of Electron. The shared part can work either in the main or the [rendered process](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process).

To use features from the main part, you'll need to set up [IPC channels](https://www.electronjs.org/docs/latest/tutorial/ipc) to use it from the rendered process.

## Install

```
$ npm install electron-util
```

> [!NOTE]
> Requires Electron 12 or later.

## Usage

```ts
import {is} from 'electron-util/shared';

console.log(is.macos && is.main);
//=> true
```

```ts
import {isDev} from 'electron-util/main';

console.log(isDev);
//=> false
```

## API

For the API documentation, check the [TSDocs](https://tsdocs.dev/docs/electron-util) page.

## Related

- [electron-store](https://github.com/sindresorhus/electron-store) - Save and load data like user preferences, app state, cache, etc
- [electron-debug](https://github.com/sindresorhus/electron-debug) - Adds useful debug features to your Electron app
- [electron-context-menu](https://github.com/sindresorhus/electron-context-menu) - Context menu for your Electron app
- [electron-dl](https://github.com/sindresorhus/electron-dl) - Simplified file downloads for your Electron app
- [electron-unhandled](https://github.com/sindresorhus/electron-unhandled) - Catch unhandled errors and promise rejections in your Electron app
