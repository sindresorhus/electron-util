'use strict';
const {BrowserWindow} = require('electron');

exports.activeWindow = () => BrowserWindow.getFocusedWindow();
