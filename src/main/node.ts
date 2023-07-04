import process from 'node:process';

const isElectron = 'electron' in process.versions;

/* eslint-disable operator-linebreak */
const isUsingAsar =
	isElectron &&
	process.argv.length > 1 &&
	process.argv[1]?.includes('app.asar');
/* eslint-enable operator-linebreak */

/**
Electron version.

@example
```
'1.7.9'
```
*/
const electronVersion = process.versions.electron || '0.0.0';

/**
ASAR is great, but it has [limitations when it comes to executing binaries](https://electronjs.org/docs/tutorial/application-packaging/#executing-binaries-inside-asar-archive).
For example, [`child_process.spawn()` is not automatically handled](https://github.com/electron/electron/issues/9459).
So you would have to unpack the binary, for example, with the [`asarUnpack`](https://www.electron.build/configuration/configuration#configuration-asarUnpack) option in `electron-builder`.
This creates a problem as the path to the binary changes, but your `path.join(__dirname, 'binary')` is not changed.
To make it work you need to fix the path. That's the purpose of this method.

Before:
/Users/sindresorhus/Kap.app/Contents/Resources/app.asar/node_modules/foo/binary

After:
/Users/sindresorhus/Kap.app/Contents/Resources/app.asar.unpacked/node_modules/foo/binary

@param path - A path in your app.
@returns The fixed path.
*/
const fixPathForAsarUnpack = (path: string): string =>
	isUsingAsar ? path.replace('app.asar', 'app.asar.unpacked') : path;

export {isElectron, isUsingAsar, electronVersion, fixPathForAsarUnpack};
