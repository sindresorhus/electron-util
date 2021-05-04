'use strict';

const isElectron = 'electron' in process.versions;

module.exports = isElectron && require.main && require.main.filename && require.main.filename.includes('app.asar');
