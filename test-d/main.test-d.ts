import {
	type BrowserWindow,
	type Rectangle,
	type MenuItemConstructorOptions,
} from 'electron';
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
	appMenu,
} from '../src/main';

/* Idk
expectType<AllElectron | Remote>(api);
expectType<boolean>(api.app.isPackaged);
*/
expectType<string>(electronVersion);

// eslint-disable-next-line @typescript-eslint/ban-types
expectType<BrowserWindow | null>(activeWindow());
expectType<string>(fixPathForAsarUnpack('/path'));

expectType<void>(enforceMacOSAppLocation());
expectType<number>(menuBarHeight());
expectType<Rectangle>(getWindowBoundsCentered());
expectType<Rectangle>(getWindowBoundsCentered({useFullBounds: true}));

expectType<void>(centerWindow({}));
expectType<boolean>(isFirstAppLaunch());
expectType<boolean>(darkMode.isEnabled);

// eslint-disable-next-line @typescript-eslint/quotes
expectType<Promise<void>>(setContentSecurityPolicy("default-src 'none';"));

expectType<void>(showAboutWindow({title: 'App name'}));
expectType<MenuItemConstructorOptions>(aboutMenuItem());
expectType<string>(debugInfo());
expectType<MenuItemConstructorOptions>(
	appMenu([
		{
			label: 'Preferences…',
			accelerator: 'Command+,',
		},
	]),
);
