import {AllElectron, Remote, BrowserWindow, Rectangle, MenuItemConstructorOptions} from 'electron';
import {expectType, expectError} from 'tsd';
import {
	api,
	is,
	electronVersion,
	chromeVersion,
	platform,
	activeWindow,
	runJS,
	fixPathForAsarUnpack,
	enforceMacOSAppLocation,
	menuBarHeight,
	getWindowBoundsCentered,
	centerWindow,
	disableZoom,
	appLaunchTimestamp,
	isFirstAppLaunch,
	darkMode,
	setContentSecurityPolicy,
	openNewGitHubIssue,
	openUrlMenuItem,
	showAboutWindow,
	aboutMenuItem,
	debugInfo,
	appMenu,
	openSystemPreferences
} from '.';

expectType<AllElectron | Remote>(api);
expectType<boolean>(api.app.isPackaged);
expectType<boolean>(is.macos);
expectType<string>(electronVersion);
expectType<string>(chromeVersion);

expectType<number | string>(platform({
	macos: 1,
	default: () => 'test'
}));

expectError(platform({}));
expectError(platform({default: 1}));

expectType<BrowserWindow>(activeWindow());
expectType<Promise<unknown>>(runJS('a=1'));
expectType<string>(fixPathForAsarUnpack('/path'));
expectType<void>(enforceMacOSAppLocation());
expectType<number>(menuBarHeight());
expectType<Rectangle>(getWindowBoundsCentered());
expectType<Rectangle>(getWindowBoundsCentered({useFullBounds: true}));
expectType<void>(centerWindow({}));
expectType<void>(disableZoom());
expectType<number>(appLaunchTimestamp);
expectType<boolean>(isFirstAppLaunch());
expectType<boolean>(darkMode.isEnabled);
expectType<void>(setContentSecurityPolicy('default-src \'none\';'));
expectType<void>(openNewGitHubIssue({user: 'sindresorhus', repo: 'electron-util'}));
expectType<MenuItemConstructorOptions>(openUrlMenuItem());
expectType<void>(showAboutWindow({title: 'App name'}));
expectType<MenuItemConstructorOptions>(aboutMenuItem());
expectType<string>(debugInfo());
expectType<MenuItemConstructorOptions>(appMenu([
	{
		label: 'Preferences…',
		accelerator: 'Command+,',
		click() {}
	}
]));

expectType<Promise<void>>(openSystemPreferences());
expectType<Promise<void>>(openSystemPreferences('security', 'Privacy_Microphone'));
expectType<Promise<void>>(openSystemPreferences('windowsupdate'));
expectError(openSystemPreferences('security', 'Bad_Section'));
