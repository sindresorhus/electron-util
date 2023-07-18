import {type MenuItemConstructorOptions} from 'electron';
import {expectType, expectError} from 'tsd';
import {
	is,
	chromeVersion,
	platform,
	runJS,
	disableZoom,
	appLaunchTimestamp,
	openNewGitHubIssue,
	openUrlMenuItem,
	openSystemPreferences,
} from '../src/shared';

expectType<boolean>(is.macos);
expectType<string>(chromeVersion);

expectType<number | string | undefined>(
	platform({
		macos: 1,
		default: () => 'test',
	}),
);

expectError(platform({}));
expectError(platform({default: 1}));

expectType<Promise<unknown> | undefined>(runJS('a=1'));

expectType<void>(disableZoom());
expectType<number>(appLaunchTimestamp);

expectType<void>(
	openNewGitHubIssue({user: 'sindresorhus', repo: 'electron-util'}),
);
expectType<MenuItemConstructorOptions>(
	openUrlMenuItem({url: 'https://sindresorhus.com'}),
);

expectType<Promise<void>>(openSystemPreferences());
expectType<Promise<void>>(
	openSystemPreferences('security', 'Privacy_Microphone'),
);
expectError(openSystemPreferences('security', 'Bad_Section'));
