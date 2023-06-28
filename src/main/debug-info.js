"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugInfo = void 0;
var process_1 = __importDefault(require("process"));
var os_1 = __importDefault(require("os"));
var electron_1 = require("electron");
var node_1 = require("./node");
/**
For example, use this in the `body` option of the `.openNewGitHubIssue()` method.

@returns A string with debug info suitable for inclusion in bug reports.

@example
```
import {debugInfo} from 'electron-util';

console.log(debugInfo());
//=> 'AppName 2.21.0\nElectron 3.0.6\ndarwin 18.2.0\nLocale: en-US'
```
*/
var debugInfo = function () {
    return "\n".concat(electron_1.app.name, " ").concat(electron_1.app.getVersion(), "\nElectron ").concat(node_1.electronVersion, "\n").concat(process_1.default.platform, " ").concat(os_1.default.release(), "\nLocale: ").concat(electron_1.app.getLocale(), "\n").trim();
};
exports.debugInfo = debugInfo;
