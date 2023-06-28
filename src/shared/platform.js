"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platform = void 0;
var process_1 = __importDefault(require("process"));
/**
Accepts an object with the keys as either `macos`, `windows`, `linux`, or `default`, and picks the appropriate key depending on the current platform.
If no platform key is matched, the `default` key is used if it exists.
If the value is a function, it will be executed, and the returned value will be used.

@example
```
init({
    enableUnicorn: util.platform({
        macos: true,
        windows: false,
        linux: () => false
    })
});
```
*/
var platform = function (choices) {
    var _platform = process_1.default.platform;
    var platform;
    switch (_platform) {
        case 'darwin':
            platform = 'macos';
            break;
        case 'win32':
            platform = 'windows';
            break;
        case 'linux':
            platform = 'linux';
            break;
        default:
            platform = 'default';
    }
    var fn = platform in choices ? choices[platform] : choices.default;
    return fn instanceof Function ? fn() : fn;
};
exports.platform = platform;
