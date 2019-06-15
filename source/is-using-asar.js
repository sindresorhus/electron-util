'use strict';

const isElectron = 'electron' in process.versions;

module.exports = isElectron && process.mainModule && process.mainModule.filename.includes('app.asar');
