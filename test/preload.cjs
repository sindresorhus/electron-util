const {ipcRenderer: ipc, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	handlePlatformTestResult: callback => ipc.on('test-platform', callback),
});
