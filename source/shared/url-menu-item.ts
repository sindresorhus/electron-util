import {type MenuItemConstructorOptions, shell} from 'electron';

export type OpenUrlMenuItemOptions = {
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
export const openUrlMenuItem = (
	options: Readonly<OpenUrlMenuItemOptions>,
): MenuItemConstructorOptions => {
	const {url, ...optionsWithoutUrl} = options;

	const click: MenuItemConstructorOptions['click'] = (...arguments_) => {
		if (optionsWithoutUrl.click) {
			optionsWithoutUrl.click(...arguments_);
		}

		void shell.openExternal(url);
	};

	return {
		...optionsWithoutUrl,
		click,
	};
};
