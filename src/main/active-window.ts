import {BrowserWindow} from 'electron';

const activeWindow = () => BrowserWindow.getFocusedWindow();

export {activeWindow};
