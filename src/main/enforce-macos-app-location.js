"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceMacOSAppLocation = void 0;
var electron_1 = require("electron");
var is = require('../shared/is');
/**
On macOS, for [security reasons](https://github.com/potionfactory/LetsMove/issues/56), if an app is launched outside the Applications folder, it will run in a read-only disk image, which could cause subtle problems for your app.
Use this method to ensure the app lives in the Applications folder.

It must not be used until the `app.whenReady()` promise is resolved.

It will be a no-op during development and on other systems than macOS.

It will offer to automatically move the app for the user.
*/
var enforceMacOSAppLocation = function () {
    if (is.development || !is.macos) {
        return;
    }
    if (electron_1.app.isInApplicationsFolder()) {
        return;
    }
    var clickedButtonIndex = electron_1.dialog.showMessageBoxSync({
        type: 'error',
        message: 'Move to Applications folder?',
        detail: "".concat(electron_1.app.name, " must live in the Applications folder to be able to run correctly."),
        buttons: ['Move to Applications folder', "Quit ".concat(electron_1.app.name)],
        defaultId: 0,
        cancelId: 1,
    });
    if (clickedButtonIndex === 1) {
        electron_1.app.quit();
        return;
    }
    electron_1.app.moveToApplicationsFolder({
        conflictHandler: function (conflict) {
            if (conflict === 'existsAndRunning') {
                // Can't replace the active version of the app
                electron_1.dialog.showMessageBoxSync({
                    type: 'error',
                    message: "Another version of ".concat(electron_1.app.name, " is currently running. Quit it, then launch this version of the app again."),
                    buttons: ['OK'],
                });
                electron_1.app.quit();
            }
            return true;
        },
    });
};
exports.enforceMacOSAppLocation = enforceMacOSAppLocation;
