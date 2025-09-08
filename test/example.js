import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert';
import {
	app,
	BrowserWindow,
	Menu,
	dialog,
} from 'electron';
import {
	openNewGitHubIssue,
	openUrlMenuItem,
	openSystemPreferences,
	runJS,
	platform,
} from '../distribution/shared/index.js';
import {
	showAboutWindow,
	aboutMenuItem,
	debugInfo,
	appMenu,
} from '../distribution/main/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createMenu = () => {
	const items = [
		{
			label: 'openNewGitHubIssue() test',
			click() {
				openNewGitHubIssue({
					user: 'sindresorhus',
					repo: 'playground',
					body: 'Test 🦄',
				});
			},
		},
		{
			label: 'openSystemPreferences() test',
			click() {
				openSystemPreferences();
			},
		},
		openUrlMenuItem({
			label: 'openUrlMenuItem() test',
			url: 'https://sindresorhus.com',
			click() {
				console.log('Executed before opening the URL');
			},
		}),
		{
			label: 'showAboutWindow() test',
			click() {
				showAboutWindow({
					icon: path.join(__dirname, 'fixtures/Icon.png'),
					copyright: 'Copyright © Sindre Sorhus',
					text: 'Some more info.',
				});
			},
		},
		aboutMenuItem({
			icon: path.join(__dirname, 'fixtures/Icon.png'),
			copyright: 'Copyright © Sindre Sorhus',
			text: 'Some more info.',
		}),
		{
			label: 'debugInfo() test',
			click() {
				dialog.showErrorBox('', debugInfo());
			},
		},
	];

	const appMenuItems = appMenu([
		{
			label: 'Extra item',
			enabled: false,
		},
	]);

	const menu = Menu.buildFromTemplate([
		appMenuItems,
		{
			label: 'Test',
			submenu: items,
		},
	]);

	Menu.setApplicationMenu(menu);
};

// eslint-disable-next-line unicorn/prefer-top-level-await -- whenReady is broken in top-level await.
(async () => {
	await app.whenReady();

	createMenu();

	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, 'preload.cjs'),
		},
	});
	await mainWindow.loadFile('index.html');

	mainWindow.webContents.openDevTools('undocked');

	assert.strictEqual(await runJS('2 + 2'), 4);

	const platformTestCases = [
		[
			'basic',
			{
				linux: 1,
				macos: 2,
				default: 3,
			},
			2,
		],
		[
			'function',
			{
				linux: 1,
				macos: () => 2,
				default: 3,
			},
			2,
		],
		[
			'default',
			{
				linux: 1,
				default: 3,
			},
			3,
		],
		[
			'undefined',
			{
				linux: 1,
			},
			undefined,
		],
	];

	setTimeout(() => {
		for (const [name, input, expected] of platformTestCases) {
			const actual = platform(input);

			if (actual === expected) {
				mainWindow.webContents.send(
					'test-platform',
					name,
					actual,
					expected,
					true,
				);
			} else {
				mainWindow.webContents.send(
					'test-platform',
					name,
					actual,
					expected,
					false,
				);
			}
		}
	}, 1000);
})();
