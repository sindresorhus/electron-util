import {BrowserWindow, Rectangle, MenuItemConstructorOptions} from 'electron';
import {expectType} from 'tsd';
import {
	electronVersion,
	activeWindow,
	fixPathForAsarUnpack,
	enforceMacOSAppLocation,
	menuBarHeight,
	getWindowBoundsCentered,
	centerWindow,
	isFirstAppLaunch,
	darkMode,
	setContentSecurityPolicy,
	showAboutWindow,
	aboutMenuItem,
	debugInfo,
	appMenu
} from './main';

/* Idk
expectType<AllElectron | Remote>(api);
expectType<boolean>(api.app.isPackaged);
*/
expectType<string>(electronVersion);

expectType<BrowserWindow>(activeWindow());
expectType<string>(fixPathForAsarUnpack('/path'));
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
expectType<void>(enforceMacOSAppLocation());
expectType<number>(menuBarHeight());
expectType<Rectangle>(getWindowBoundsCentered());
expectType<Rectangle>(getWindowBoundsCentered({useFullBounds: true}));
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
expectType<void>(centerWindow({}));
expectType<boolean>(isFirstAppLaunch());
expectType<boolean>(darkMode.isEnabled);
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
expectType<void>(setContentSecurityPolicy('default-src \'none\';'));
// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
expectType<void>(showAboutWindow({title: 'App name'}));
expectType<MenuItemConstructorOptions>(aboutMenuItem());
expectType<string>(debugInfo());
expectType<MenuItemConstructorOptions>(appMenu([
	{
		label: 'Preferences…',
		accelerator: 'Command+,'
	}
]));
