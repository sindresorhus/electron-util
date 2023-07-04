import {nativeTheme} from 'electron';
import {is} from '../shared/is';

type DarkMode = {
	/**
	Whether the macOS dark mode is enabled.
	On Windows and Linux, it's `false`.
	*/
	readonly isEnabled: boolean;

	/**
	The `callback` function is called when the macOS dark mode is toggled.

	@returns A function, that when called, unsubscribes the listener. Calling it on Window and Linux works, but it just returns a no-op function.
	*/
	readonly onChange: (callback: () => void) => () => void;
};

/**
@example
```
import {darkMode} from 'electron-util';

console.log(darkMode.isEnabled);
//=> false

darkMode.onChange(() => {
	console.log(darkMode.isEnabled);
	//=> true
});
```
*/
const darkMode: DarkMode = {
	get isEnabled() {
		if (!is.macos) {
			return false;
		}

		return nativeTheme.shouldUseDarkColors;
	},

	onChange(callback) {
		if (!is.macos) {
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			return () => {};
		}

		const handler = () => {
			callback();
		};

		nativeTheme.on('updated', handler);

		return () => {
			nativeTheme.off('updated', handler);
		};
	},
};

export {darkMode, type DarkMode};
