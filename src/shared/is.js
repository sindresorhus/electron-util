"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = void 0;
var process_1 = __importDefault(require("process"));
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
var is_using_asar_1 = require("../main/is-using-asar");
var is = {
    macos: process_1.default.platform === 'darwin',
    linux: process_1.default.platform === 'linux',
    windows: process_1.default.platform === 'win32',
    main: process_1.default.type === 'browser',
    renderer: process_1.default.type === 'renderer',
    // TODO: This runs in main
    usingAsar: is_using_asar_1.isUsingAsar,
    development: electron_is_dev_1.default,
    macAppStore: process_1.default.mas === true,
    windowsStore: process_1.default.windowsStore === true,
};
exports.is = is;
