'use strict';
const assert = require('assert');
const electron = require('electron');
const delay = require('delay');
const util = require('.');

const createMenu = () => {
	const items = [
		{
			label: 'Open GitHub Issue…',
			click() {
				util.openNewGitHubIssue({
					user: 'sindresorhus',
					repo: 'playground',
					body: 'Test 🦄'
				});
			}
		}
	];

	const menu = electron.Menu.buildFromTemplate([
		{
			label: electron.app.getName(),
			submenu: [
				{
					role: 'quit'
				}
			]
		},
		{
			label: 'Test',
			submenu: items
		}
	]);

	electron.Menu.setApplicationMenu(menu);
};

(async () => {
	await electron.app.whenReady();

	createMenu();

	const win = new electron.BrowserWindow();
	win.loadURL('about:blank');

	await delay(200);

	assert.strictEqual(await util.runJS('2 + 2'), 4);
})();
