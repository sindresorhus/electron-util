import {type MenuItemConstructorOptions, shell} from 'electron';

type OpenUrlMenuItemOptions = {
	/**
	URL to be opened when the menu item is clicked.
	*/
	readonly url: string;
} & Readonly<MenuItemConstructorOptions>;

/**
Accepts the same options as [`new MenuItem()`](https://electronjs.org/docs/api/menu-item) in addition to a `url` option.
If you specify the `click` option, its handler will be called before the URL is opened.

@returns A `MenuItemConstructorOptions` that creates a menu item, which opens the given URL in the browser when clicked.

@example
```
import {Menu} from 'electron';
import {openUrlMenuItem} from 'electron-util';

const menu = Menu.buildFromTemplate([
	{
		label: 'Help',
		submenu: [
			openUrlMenuItem({
				label: 'Website',
				url: 'https://sindresorhus.com'
			})
		]
	}
]);

Menu.setApplicationMenu(menu);
*/
const openUrlMenuItem = (
	url: string,
	options?: Readonly<MenuItemConstructorOptions>,
): MenuItemConstructorOptions => {
	const click: MenuItemConstructorOptions['click'] = (...args) => {
		if (options?.click) {
			options?.click(...args);
		}

		void shell.openExternal(url);
	};

	return {
		...options,
		click,
	};
};

export {type OpenUrlMenuItemOptions, openUrlMenuItem};
