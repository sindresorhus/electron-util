import process from 'node:process';

const chromeVersion = process.versions.chrome.replace(/\.\d+$/, '');

export {chromeVersion};
