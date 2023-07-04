const electron = require('electron');

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 800,
		height: 600,
	});

	win.loadURL('https://sindresorhus.com');
}

// eslint-disable-next-line unicorn/prefer-top-level-await
electron.app.whenReady().then(() => {
	createMainWindow();

	electron.app.on('activate', () => {
		if (electron.BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
	});
});

electron.app.on('window-all-closed', () => {
	electron.app.quit();
});
