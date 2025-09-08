import {BrowserWindow} from 'electron';

export const activeWindow = (): BrowserWindow | undefined => BrowserWindow.getFocusedWindow() ?? undefined;
