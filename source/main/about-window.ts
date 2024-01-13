import {
	app,
	dialog,
	type AboutPanelOptionsOptions,
	type MenuItemConstructorOptions,
} from 'electron';
import {is} from '../shared/index.js';

export type ShowAboutWindowOptions = {
	/**
	An absolute path to the app icon.

	Only used on Linux and Windows.
	*/
	readonly icon?: string;

	/**
	The copyright text.
	*/
	readonly copyright?: string;

	/**
	The URL to the app's website.

	Only used on Linux.
	*/
	readonly website?: string;

	/**
	Some additional text if needed.

	Only used on Windows.
	*/
	readonly text?: string;

	/**
	Customizable for localization. Used in the menu item label and window title (Windows-only).

	The app name is automatically appended at runtime.

	Only used on Linux and Windows.

	@default 'About'
	*/
	readonly title?: string;
};

export type AboutMenuItemOptions = ShowAboutWindowOptions;

/**
Shows an 'About' window. On macOS and Linux, the native 'About' window is shown, and on Windows, a simple custom dialog is shown.
On macOS, the `icon`, `text`, `title`, and `website` options are ignored.

_It will show `Electron` as the app name until you build your app for production._

@param options

@example
```
import {showAboutWindow} from 'electron-util';

showAboutWindow({
	icon: path.join(__dirname, 'static/Icon.png'),
	copyright: 'Copyright © Sindre Sorhus',
	text: 'Some more info.'
});
```
*/
export const showAboutWindow = (options: ShowAboutWindowOptions) => {
	if (!is.windows) {
		if (
			options.copyright
			?? (is.linux && options.icon)
			?? (is.linux && options.website)
		) {
			const aboutPanelOptions: AboutPanelOptionsOptions = {
				copyright: options.copyright,
			};

			if (is.linux && options.icon) {
				aboutPanelOptions.iconPath = options.icon;
			}

			app.setAboutPanelOptions(aboutPanelOptions);
		}

		app.showAboutPanel();

		return;
	}

	options = {
		title: 'About',
		...options,
	};

	const text = options.text
		? `${options.copyright ? '\n\n' : ''}${options.text}`
		: '';

	void dialog.showMessageBox({

		title: `${options.title} ${app.name}`,
		message: `Version ${app.getVersion()}`,
		detail: (options.copyright ?? '') + text,
		icon: options.icon,

		// This is needed for Linux, since at least Ubuntu does not show a close button
		buttons: ['OK'],
	});
};

/**
Accepts the same options as `.showAboutWindow()`.

@returns A `MenuItemConstructorOptions` that creates a menu item, which shows the about dialog when clicked.

@example
```
import {Menu} from 'electron';
import {aboutMenuItem} from 'electron-util';

const menu = Menu.buildFromTemplate([
	{
		label: 'Help',
		submenu: [
			aboutMenuItem({
				icon: path.join(__dirname, 'static/Icon.png'),
				copyright: 'Copyright © Sindre Sorhus',
				text: 'Some more info.'
			})
		]
	}
]);

Menu.setApplicationMenu(menu);
*/
export const aboutMenuItem = (
	options?: AboutMenuItemOptions,
): MenuItemConstructorOptions => {
	options = {
		title: 'About',
		...options,
	};

	// TODO: When https://github.com/electron/electron/issues/15589 is fixed,
	// handle the macOS case here, so the user doesn't need a conditional
	// when used in a cross-platform app

	return {

		label: `${options.title} ${app.name}`,
		click() {
			showAboutWindow(options ?? {});
		},
	};
};
