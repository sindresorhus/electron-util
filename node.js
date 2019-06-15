'use strict';

exports.isElectron = 'electron' in process.versions;

exports.electronVersion = process.versions.electron || '0.0.0';

exports.isUsingAsar = require('./source/is-using-asar');

exports.fixPathForAsarUnpack = path => exports.isUsingAsar ? path.replace('app.asar', 'app.asar.unpacked') : path;
