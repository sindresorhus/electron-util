'use strict';

const process = require('process');

const isElectron = 'electron' in process.versions;

module.exports = isElectron && require.main && require.main.filename && require.main.filename.includes('app.asar');
