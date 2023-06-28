import process from 'process';

const chromeVersion = process.versions.chrome.replace(/\.\d+$/, '');

export {chromeVersion};
