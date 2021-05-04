'use strict';

const os = require('os');
const {app} = require('electron');
const {electronVersion} = require('./node');

exports.debugInfo = () => `
${'name' in app ? app.name : app.getName()} ${app.getVersion()}
Electron ${electronVersion}
${process.platform} ${os.release()}
Locale: ${app.getLocale()}
`.trim();
