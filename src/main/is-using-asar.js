"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUsingAsar = void 0;
var node_1 = require("./node");
var isUsingAsar = node_1.isElectron && require.main && require.main.filename
    ? require.main.filename.includes('app.asar')
    : false;
exports.isUsingAsar = isUsingAsar;
