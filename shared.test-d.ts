import {MenuItemConstructorOptions} from 'electron';
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
	openSystemPreferences
} from './shared';

expectType<boolean>(is.macos);
expectType<string>(chromeVersion);

expectType<number | string>(platform({
	macos: 1,
	default: () => 'test'
}));

expectError(platform({}));
expectError(platform({default: 1}));

expectType<Promise<unknown>>(runJS('a=1'));
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
expectType<void>(disableZoom());
expectType<number>(appLaunchTimestamp);
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
expectType<void>(openNewGitHubIssue({user: 'sindresorhus', repo: 'electron-util'}));
expectType<MenuItemConstructorOptions>(openUrlMenuItem());

expectType<Promise<void>>(openSystemPreferences());
expectType<Promise<void>>(openSystemPreferences('security', 'Privacy_Microphone'));
expectError(openSystemPreferences('security', 'Bad_Section'));
