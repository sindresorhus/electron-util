"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirstAppLaunch = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var electron_1 = require("electron");
function isError(error) {
    return error instanceof Error;
}
/**
It works by writing a file to `app.getPath('userData')` if it doesn't exist and checks that.
That means it will return true the first time you add this check to your app.

@returns A `boolean` of whether it's the first time your app is launched.
*/
var isFirstAppLaunch = function () {
    var checkFile = path_1.default.join(electron_1.app.getPath('userData'), '.electron-util--has-app-launched');
    if (fs_1.default.existsSync(checkFile)) {
        return false;
    }
    try {
        fs_1.default.writeFileSync(checkFile, '');
    }
    catch (error) {
        if (isError(error)) {
            if (error.code === 'ENOENT') {
                fs_1.default.mkdirSync(electron_1.app.getPath('userData'));
                return isFirstAppLaunch();
            }
        }
        else {
            throw error;
        }
    }
    return true;
};
exports.isFirstAppLaunch = isFirstAppLaunch;
