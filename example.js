'use strict';
const path = require('path');
const assert = require('assert');
const electron = require('electron');
const delay = require('delay');
const util = require('.');

const createMenu = () => {
	const items = [
		{
			label: 'openNewGitHubIssue() test',
			click() {
				util.openNewGitHubIssue({
					user: 'sindresorhus',
					repo: 'playground',
					body: 'Test 🦄'
				});
			}
		},
		util.openUrlMenuItem({
			label: 'openUrlMenuItem() test',
			url: 'https://sindresorhus.com',
			onClick() {
				console.log('Executed before opening the URL');
			}
		}),
		{
			label: 'showAboutWindow() test',
			click() {
				util.showAboutWindow({
					icon: path.join(__dirname, 'fixtures/Icon.png'),
					copyright: 'Copyright © Sindre Sorhus',
					text: 'Some more info.'
				});
			}
		},
		util.aboutMenuItem({
			icon: path.join(__dirname, 'fixtures/Icon.png'),
			copyright: 'Copyright © Sindre Sorhus',
			text: 'Some more info.'
		}),
		{
			label: 'debugInfo() test',
			click() {
				electron.dialog.showErrorBox('', util.debugInfo());
			}
		}
	];

	const menu = electron.Menu.buildFromTemplate([
		util.appMenu([
			{
				label: 'Extra item',
				enabled: false
			}
		]),
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
	win.webContents.openDevTools('undocked');

	await delay(200);

	assert.strictEqual(await util.runJS('2 + 2'), 4);
})();
