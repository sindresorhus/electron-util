import process from 'process';
import {RequireAtLeastOne, ValueOf} from 'type-fest';

type _Choices<Macos, Windows, Linux, Default> = {
	readonly macos?: Macos | (() => Macos);
	readonly windows?: Windows | (() => Windows);
	readonly linux?: Linux | (() => Linux);
	readonly default?: Default | (() => Default);
};

type Choices<Macos, Windows, Linux, Default> = RequireAtLeastOne<
	_Choices<Macos, Windows, Linux, Default>,
	'macos' | 'windows' | 'linux'
>;

type _Platform = 'macos' | 'windows' | 'linux' | 'default';

/**
Accepts an object with the keys as either `macos`, `windows`, `linux`, or `default`, and picks the appropriate key depending on the current platform.
If no platform key is matched, the `default` key is used if it exists.
If the value is a function, it will be executed, and the returned value will be used.

@example
```
init({
	enableUnicorn: util.platform({
		macos: true,
		windows: false,
		linux: () => false
	})
});
```
*/
const platform = <
	Macos = never,
	Windows = never,
	Linux = never,
	Default = undefined,
>(
	choices: Choices<Macos, Windows, Linux, Default>,
) => {
	let {platform: _platform} = process;

	let platform: _Platform;

	switch (_platform) {
		case 'darwin':
			platform = 'macos';
			break;
		case 'win32':
			platform = 'windows';
			break;
		case 'linux':
			platform = 'linux';
			break;
		default:
			platform = 'default';
	}

	// TODO: This can't return undefined, but TypeScript doesn't know that
	const fn: ValueOf<Choices<Macos, Windows, Linux, Default>> =
		platform in choices ? choices[platform] : choices.default;

	return fn instanceof Function ? fn() : fn;
};

export {Choices, platform};
