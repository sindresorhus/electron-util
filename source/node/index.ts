import process from 'node:process';

/**
Check if the code is running in an Electron environment.

@example
```
import {isElectron} from 'electron-util/node';

console.log(isElectron);
//=> true when in Electron, false when in Node.js
```
*/
export const isElectron = 'electron' in process.versions;

/**
Check if the app is using [ASAR](https://electronjs.org/docs/tutorial/application-packaging/).

@example
```
import {isUsingAsar} from 'electron-util/node';

if (isUsingAsar) {
	console.log('Running from an ASAR archive');
}
```
*/
export const isUsingAsar = isElectron && process.argv.some(argument => argument?.includes('app.asar'));

/**
Electron version.

@example
```
'1.7.9'
```
*/
export const electronVersion = process.versions.electron ?? '0.0.0';

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

@example
```
import {fixPathForAsarUnpack} from 'electron-util/node';

const binaryPath = path.join(__dirname, 'binary');
const fixedPath = fixPathForAsarUnpack(binaryPath);
//=> '/path/to/app.asar.unpacked/binary' when in ASAR
//=> '/path/to/binary' otherwise
```
*/
export const fixPathForAsarUnpack = (path: string): string =>
	isUsingAsar ? path.replaceAll('app.asar', 'app.asar.unpacked') : path;
