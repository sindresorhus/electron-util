"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runJS = void 0;
var electron_1 = require("electron");
var active_window_1 = require("../main/active-window");
var is_1 = require("./is");
/**
122,130d33
Run some JavaScript in the active or given window.

@param code - JavaScript code to be executed.
@param web - Default: webContents from current window.
@returns A promise for the result of the executed code or a rejected promise if the result is a rejected promise.
*/
// TODO: Handle if undefined
var runJS = function (code, web) {
    var _a;
    if (web === void 0) { web = is_1.is.main ? (_a = (0, active_window_1.activeWindow)()) === null || _a === void 0 ? void 0 : _a.webContents : electron_1.webFrame; }
    return web === null || web === void 0 ? void 0 : web.executeJavaScript(code);
};
exports.runJS = runJS;
