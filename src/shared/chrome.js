"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chromeVersion = void 0;
var process_1 = __importDefault(require("process"));
var chromeVersion = process_1.default.versions.chrome.replace(/\.\d+$/, '');
exports.chromeVersion = chromeVersion;
