'use strict';

const {aboutMenuItem, showAboutWindow} = require('./main/about-window');
const {activeWindow} = require('./main/active-window');
const {appMenu} = require('./main/app-menu');
const {darkMode} = require('./main/dark-mode');
const {debugInfo} = require('./main/debug-info');
const enforceMacOSAppLocation = require('./main/enforce-macos-app-location');
const {isFirstAppLaunch} = require('./main/first-app-launch');
const {electronVersion, fixPathForAsarUnpack, isElectron, isUsingAsar} = require('./main/node');
const {setContentSecurityPolicy} = require('./main/security-policy');
const {centerWindow, getWindowBoundsCentered, menuBarHeight} = require('./main/window');

exports.aboutMenuItem = aboutMenuItem;
exports.showAboutWindow = showAboutWindow;
exports.activeWindow = activeWindow;
exports.appMenu = appMenu;
exports.darkMode = darkMode;
exports.debugInfo = debugInfo;
exports.enforceMacOSAppLocation = enforceMacOSAppLocation;
exports.isFirstAppLaunch = isFirstAppLaunch;
exports.electronVersion = electronVersion;
exports.fixPathForAsarUnpack = fixPathForAsarUnpack;
exports.isElectron = isElectron;
exports.isUsingAsar = isUsingAsar;
exports.setContentSecurityPolicy = setContentSecurityPolicy;
exports.centerWindow = centerWindow;
exports.getWindowBoundsCentered = getWindowBoundsCentered;
exports.menuBarHeight = menuBarHeight;
