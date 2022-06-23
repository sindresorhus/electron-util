'use strict';

const process = require('process');

exports.chromeVersion = process.versions.chrome.replace(/\.\d+$/, '');
