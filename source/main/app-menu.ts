import {app, type MenuItemConstructorOptions} from 'electron';

/**
Creating the [app menu](https://developer.apple.com/design/human-interface-guidelines/macos/menus/menu-bar-menus/) (the first menu) on macOS requires [a lot of boilerplate](https://github.com/sindresorhus/caprine/blob/5361289d1058b9463946f274cbfef587e6ad24a3/menu.js#L381-L431).
This method includes the default boilerplate and lets you add additional menu items in the correct place.

@param menuItems - Menu items to add below the `About App Name` menu item. Usually, you would add at least a `Preferences…` menu item.
@returns All menu items for the app menu.

@example
```
import {Menu} from 'electron';
import {appMenu} from 'electron-util';

const menu = Menu.buildFromTemplate([
	appMenu([
		{
			label: 'Preferences…',
			accelerator: 'Command+,',
			click() {}
		}
	])
]);

Menu.setApplicationMenu(menu);
```
*/
export const appMenu = (
	menuItems?: readonly MenuItemConstructorOptions[],
): MenuItemConstructorOptions =>
	// TODO: When https://github.com/electron/electron/issues/15589 is fixed,
	// handle the macOS case here, so the user doesn't need a conditional
	// when used in a cross-platform app
	({
		label: app.name,
		submenu: [
			{
				role: 'about',
			},
			{
				type: 'separator',
			},
			...(menuItems ?? []),
			{
				type: 'separator',
			},
			{
				role: 'services',
			},
			{
				type: 'separator',
			},
			{
				role: 'hide',
			},
			{
				role: 'hideOthers',
			},
			{
				role: 'unhide',
			},
			{
				type: 'separator',
			},
			{
				role: 'quit',
			},
		],
	});
