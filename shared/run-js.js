'use strict';

const process = require('process');
const {webFrame} = require('electron');
const {activeWindow} = require('../main/active-window');

exports.runJS = (code, web = process.type === 'browser' ? activeWindow().webContents : webFrame) => web.executeJavaScript(code);
