import {shell} from 'electron';
import {is} from './is';

type SystemPreferencesPanes = {
	universalaccess:
		| 'Captioning'
		| 'Hearing'
		| 'Keyboard'
		| 'Media_Descriptions'
		| 'Mouse'
		| 'Seeing_Display'
		| 'Seeing_VoiceOver'
		| 'Seeing_Zoom'
		| 'SpeakableItems'
		| 'Switch';
	security:
		| 'Advanced'
		| 'FDE'
		| 'Firewall'
		| 'General'
		| 'Privacy'
		| 'Privacy_Accessibility'
		| 'Privacy_Advertising'
		/**
		Full Disk Access.
		*/
		| 'Privacy_AllFiles'
		| 'Privacy_Assistive'
		| 'Privacy_Automation'
		| 'Privacy_Calendars'
		| 'Privacy_Camera'
		| 'Privacy_Contacts'
		| 'Privacy_DesktopFolder'
		| 'Privacy_Diagnostics'
		| 'Privacy_DocumentsFolder'
		| 'Privacy_DownloadsFolder'
		| 'Privacy_LocationServices'
		| 'Privacy_Microphone'
		| 'Privacy_Photos'
		| 'Privacy_Reminders'
		| 'Privacy_ScreenCapture';
	speech: 'Dictation' | 'TTS';
	sharing:
		| 'Internet'
		| 'Services_ARDService'
		| 'Services_BluetoothSharing'
		| 'Services_PersonalFileSharing'
		| 'Services_PrinterSharing'
		| 'Services_RemoteAppleEvent'
		| 'Services_RemoteLogin'
		| 'Services_ScreenSharing';
};

/**
Open the System Preferences on macOS.

This method does nothing on other systems.

Optionally provide a pane and section.

@example
```
import {openSystemPreferences} from 'electron-util';

openSystemPreferences();

// or

openSystemPreferences('security', 'Firewall');
```

@param pane - The pane to open.
@param section - The section within that pane.
@returns A Promise that resolves when the preferences window is opened.
*/
const openSystemPreferences = async <T extends keyof SystemPreferencesPanes>(
	pane?: T,
	section?: SystemPreferencesPanes[T],
) => {
	if (is.macos) {
		await shell.openExternal(
			`x-apple.systempreferences:com.apple.preference.${pane}${
				section ? `?${section}` : ''
			}`,
		);
	} else if (is.windows) {
		await shell.openExternal(`ms-settings:${pane}`);
	}

	await shell.openExternal(
		`x-apple.systempreferences:com.apple.preference.${pane}${
			section ? `?${section}` : ''
		}`,
	);
};

export {SystemPreferencesPanes, openSystemPreferences};
