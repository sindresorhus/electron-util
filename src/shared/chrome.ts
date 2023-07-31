import process from 'node:process';

export const chromeVersion = process.versions.chrome.replace(/\.\d+$/, '');
