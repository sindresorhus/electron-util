"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutMenuItem = exports.showAboutWindow = void 0;
var electron_1 = require("electron");
var is = require('../shared/is');
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
var showAboutWindow = function (options) {
    if (!is.windows) {
        if (options.copyright ||
            (is.linux && options.icon) ||
            (is.linux && options.website)) {
            var aboutPanelOptions = {
                copyright: options.copyright,
            };
            if (is.linux && options.icon) {
                aboutPanelOptions.iconPath = options.icon;
            }
            electron_1.app.setAboutPanelOptions(aboutPanelOptions);
        }
        electron_1.app.showAboutPanel();
        return;
    }
    options = __assign({ title: 'About' }, options);
    var text = options.text
        ? "".concat(options.copyright ? '\n\n' : '').concat(options.text)
        : '';
    electron_1.dialog.showMessageBox({
        title: "".concat(options.title, " ").concat(electron_1.app.name),
        message: "Version ".concat(electron_1.app.getVersion()),
        detail: (options.copyright || '') + text,
        icon: options.icon,
        // This is needed for Linux, since at least Ubuntu does not show a close button
        buttons: ['OK'],
    });
};
exports.showAboutWindow = showAboutWindow;
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
var aboutMenuItem = function (options) {
    options = __assign({ title: 'About' }, options);
    // TODO: When https://github.com/electron/electron/issues/15589 is fixed,
    // handle the macOS case here, so the user doesn't need a conditional
    // when used in a cross-platform app
    return {
        label: "".concat(options.title, " ").concat(electron_1.app.name),
        click: function () {
            exports.showAboutWindow(options);
        },
    };
};
exports.aboutMenuItem = aboutMenuItem;
