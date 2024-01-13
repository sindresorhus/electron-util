import {BrowserWindow} from 'electron';

export const activeWindow = () => BrowserWindow.getFocusedWindow();
