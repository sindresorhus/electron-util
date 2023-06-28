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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openUrlMenuItem = void 0;
var electron_1 = require("electron");
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
var openUrlMenuItem = function (_a) {
    var url = _a.url, options = __rest(_a, ["url"]);
    var click = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (options.click) {
            options.click.apply(options, args);
        }
        electron_1.shell.openExternal(url);
    };
    return __assign(__assign({}, options), { click: click });
};
exports.openUrlMenuItem = openUrlMenuItem;
