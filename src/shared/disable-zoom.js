"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableZoom = void 0;
var electron_1 = require("electron");
var is_1 = require("./is");
var active_window_1 = require("../main/active-window");
/**
265,276d167
Disable zooming, usually caused by pinching the trackpad on macOS or Ctrl+ on Windows.

@param window - Default: webContents from current window.
*/
var disableZoom = function (web) {
    var _a;
    if (web === void 0) { web = is_1.is.main ? (_a = (0, active_window_1.activeWindow)()) === null || _a === void 0 ? void 0 : _a.webContents : electron_1.webFrame; }
    var run = function () {
        // TODO: Check if undefined
        web === null || web === void 0 ? void 0 : web.setZoomFactor(1);
    };
    // TODO: Check if undefined
    web === null || web === void 0 ? void 0 : web.on('did-finish-load', run);
    run();
};
exports.disableZoom = disableZoom;
