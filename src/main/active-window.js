"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeWindow = void 0;
var electron_1 = require("electron");
var activeWindow = function () { return electron_1.BrowserWindow.getFocusedWindow(); };
exports.activeWindow = activeWindow;
