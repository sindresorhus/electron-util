"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkMode = void 0;
var electron_1 = require("electron");
var is = require('../shared/is').is;
/**
@example
```
import {darkMode} from 'electron-util';

console.log(darkMode.isEnabled);
//=> false

darkMode.onChange(() => {
    console.log(darkMode.isEnabled);
    //=> true
});
```
*/
var darkMode = {
    get isEnabled() {
        if (!is.macos) {
            return false;
        }
        return electron_1.nativeTheme.shouldUseDarkColors;
    },
    onChange: function (callback) {
        if (!is.macos) {
            return function () { };
        }
        var handler = function () {
            callback();
        };
        electron_1.nativeTheme.on('updated', handler);
        return function () {
            electron_1.nativeTheme.off('updated', handler);
        };
    },
};
exports.darkMode = darkMode;
