import {BrowserWindow} from 'electron';
import {expectType} from 'tsd-check';
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
	setWindowBounds,
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
	appMenu
} from '.';

expectType<Electron.AllElectron | Electron.Remote>(api);
expectType<boolean>(api.app.isPackaged);
expectType<boolean>(is.macos);
expectType<string>(electronVersion);
expectType<string>(chromeVersion);

expectType<number | string>(platform({
	macos: 1,
	default: () => 'test'
}));

// These should fail:
// platform({});
//
// platform({
// 	default: 1
// });

expectType<Electron.BrowserWindow>(activeWindow());
expectType<Promise<any>>(runJS('a=1'));
expectType<string>(fixPathForAsarUnpack('/path'));
expectType<void>(enforceMacOSAppLocation());
expectType<number>(menuBarHeight());
expectType<Electron.Rectangle>(getWindowBoundsCentered());
expectType<void>(setWindowBounds({width: 1920, height: 1080}));
expectType<void>(centerWindow({}));
expectType<void>(disableZoom());
expectType<number>(appLaunchTimestamp);
expectType<boolean>(isFirstAppLaunch());
expectType<boolean>(darkMode.isEnabled);
expectType<void>(setContentSecurityPolicy('default-src \'none\';'));
expectType<void>(openNewGitHubIssue({user: 'sindresorhus', repo: 'electron-util'}));
expectType<Electron.MenuItem>(openUrlMenuItem());
expectType<void>(showAboutWindow({title: 'App name'}));
expectType<Electron.MenuItem>(aboutMenuItem());
expectType<string>(debugInfo());
expectType<Electron.MenuItemConstructorOptions>(appMenu([
	{
		label: 'Preferences…',
		accelerator: 'Command+,',
		click() {}
	}
]));
