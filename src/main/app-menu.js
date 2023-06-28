"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appMenu = void 0;
var electron_1 = require("electron");
// TODO: See what the return type is here
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
var appMenu = function (menuItems) {
    // TODO: When https://github.com/electron/electron/issues/15589 is fixed,
    // handle the macOS case here, so the user doesn't need a conditional
    // when used in a cross-platform app
    return {
        label: electron_1.app.name,
        submenu: __spreadArray(__spreadArray([
            {
                role: 'about',
            },
            {
                type: 'separator',
            }
        ], (menuItems !== null && menuItems !== void 0 ? menuItems : []), true), [
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
        ], false),
    };
};
exports.appMenu = appMenu;
