'use strict';
const assert = require('assert');
const electron = require('electron');
const delay = require('delay');
const util = require('.');

(async () => {
	await util.appReady;

	const win = new electron.BrowserWindow();
	win.loadURL('about:blank');

	await delay(200);

	assert.strictEqual(await util.runJS('2 + 2'), 4);

	electron.app.quit();
})();
