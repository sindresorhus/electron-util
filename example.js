'use strict';
const path = require('path');
const assert = require('assert');
const {app, BrowserWindow, Menu, dialog} = require('electron');
const {
	openNewGitHubIssue,
	openUrlMenuItem,
	showAboutWindow,
	aboutMenuItem,
	debugInfo,
	appMenu,
	runJS
} = require('.');
/// const enforceMacosAppLocation = require('./source/enforce-macos-app-location');

const createMenu = () => {
	const items = [
		{
			label: 'openNewGitHubIssue() test',
			click() {
				openNewGitHubIssue({
					user: 'sindresorhus',
					repo: 'playground',
					body: 'Test 🦄'
				});
			}
		},
		openUrlMenuItem({
			label: 'openUrlMenuItem() test',
			url: 'https://sindresorhus.com',
			onClick() {
				console.log('Executed before opening the URL');
			}
		}),
		{
			label: 'showAboutWindow() test',
			click() {
				showAboutWindow({
					icon: path.join(__dirname, 'fixtures/Icon.png'),
					copyright: 'Copyright © Sindre Sorhus',
					text: 'Some more info.'
				});
			}
		},
		aboutMenuItem({
			icon: path.join(__dirname, 'fixtures/Icon.png'),
			copyright: 'Copyright © Sindre Sorhus',
			text: 'Some more info.'
		}),
		{
			label: 'debugInfo() test',
			click() {
				dialog.showErrorBox('', debugInfo());
			}
		}
	];

	const menu = Menu.buildFromTemplate([
		appMenu([
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

	Menu.setApplicationMenu(menu);
};

let mainWindow;

(async () => {
	await app.whenReady();

	/// enforceMacosAppLocation();

	createMenu();

	mainWindow = new BrowserWindow();
	await mainWindow.loadURL('about:blank');

	mainWindow.webContents.openDevTools('undocked');

	assert.strictEqual(await runJS('2 + 2'), 4);
})();
