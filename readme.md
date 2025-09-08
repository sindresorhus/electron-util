# electron-util

> Useful utilities for Electron apps and modules

You can use this package directly in both the [main and renderer process](https://www.electronjs.org/docs/latest/tutorial/quick-start/#main-process).

This package is organized into three parts:

- **`shared`** - APIs that work in both the main and [renderer process](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process)
- **`main`** - APIs that only work in the [main process](https://www.electronjs.org/docs/latest/tutorial/quick-start/#run-the-main-process) (requires Electron APIs)
- **`node`** - APIs that work in any Node.js environment, even outside Electron (pure Node.js utilities for detecting Electron environment, ASAR usage, etc.)

To use features from the "main" part in the renderer process, you will need to set up [IPC channels](https://www.electronjs.org/docs/latest/tutorial/ipc).

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

For the "main" API, use the `/main` sub-export:

```ts
import {isDev} from 'electron-util/main';

console.log(isDev);
//=> false
```

For the "node" API, use the `/node` sub-export:

```ts
import {isElectron, fixPathForAsarUnpack} from 'electron-util/node';

console.log(isElectron);
//=> true when running in Electron, false in plain Node.js

const fixedPath = fixPathForAsarUnpack('/path/app.asar/binary');
//=> '/path/app.asar.unpacked/binary' when in ASAR, or unchanged otherwise
```

## API

~~[Documentation](https://tsdocs.dev/docs/electron-util)~~ (The service is broken)

Look at the [types](source) for now.

## Related

- [electron-store](https://github.com/sindresorhus/electron-store) - Save and load data like user preferences, app state, cache, etc
- [electron-debug](https://github.com/sindresorhus/electron-debug) - Adds useful debug features to your Electron app
- [electron-context-menu](https://github.com/sindresorhus/electron-context-menu) - Context menu for your Electron app
- [electron-dl](https://github.com/sindresorhus/electron-dl) - Simplified file downloads for your Electron app
- [electron-unhandled](https://github.com/sindresorhus/electron-unhandled) - Catch unhandled errors and promise rejections in your Electron app
