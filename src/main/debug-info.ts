import process from 'node:process';
import os from 'node:os';
import {app} from 'electron';
import {electronVersion} from './node';

/**
For example, use this in the `body` option of the `.openNewGitHubIssue()` method.

@returns A string with debug info suitable for inclusion in bug reports.

@example
```
import {debugInfo} from 'electron-util';

console.log(debugInfo());
//=> 'AppName 2.21.0\nElectron 3.0.6\ndarwin 18.2.0\nLocale: en-US'
```
*/
export const debugInfo = () =>
	`
${app.name} ${app.getVersion()}
Electron ${electronVersion}
${process.platform} ${os.release()}
Locale: ${app.getLocale()}
`.trim();
