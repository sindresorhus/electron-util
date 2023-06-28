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
exports.centerWindow = exports.getWindowBoundsCentered = exports.menuBarHeight = void 0;
var electron_1 = require("electron");
var is = require('../shared/is').is;
var active_window_1 = require("./active-window");
/**
@returns The height of the menu bar on macOS, or `0` if not macOS.
*/
var menuBarHeight = function () {
    return is.macos ? electron_1.screen.getPrimaryDisplay().workArea.y : 0;
};
exports.menuBarHeight = menuBarHeight;
/**
Get the [bounds](https://electronjs.org/docs/api/browser-window#wingetbounds) of a window as if it was centered on the screen.

@returns Bounds of a window.
*/
var getWindowBoundsCentered = function (options) {
    var _a, _b;
    options = __assign({ window: (_a = (0, active_window_1.activeWindow)()) !== null && _a !== void 0 ? _a : undefined }, options);
    // TODO: Check for undefined
    var _c = options.window.getSize(), width = _c[0], height = _c[1];
    var windowSize = (_b = options.size) !== null && _b !== void 0 ? _b : { width: width, height: height };
    var screenSize = electron_1.screen.getDisplayNearestPoint(electron_1.screen.getCursorScreenPoint()).workArea;
    var x = Math.floor(screenSize.x + (screenSize.width / 2 - windowSize.width / 2));
    var y = Math.floor((screenSize.height + screenSize.y) / 2 - windowSize.height / 2);
    return {
        x: x,
        y: y,
        width: windowSize.width,
        height: windowSize.height,
    };
};
exports.getWindowBoundsCentered = getWindowBoundsCentered;
/**
Center a window on the screen.
*/
var centerWindow = function (options) {
    var _a;
    options = __assign({ window: (_a = (0, active_window_1.activeWindow)()) !== null && _a !== void 0 ? _a : undefined, animated: false }, options);
    var bounds = exports.getWindowBoundsCentered(options);
    // TODO: Check for undefined
    options.window.setBounds(bounds, options.animated);
};
exports.centerWindow = centerWindow;
