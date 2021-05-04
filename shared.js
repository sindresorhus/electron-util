'use strict';

const {appLaunchTimestamp} = require('./shared/app-launch-timestamp');
const {chromeVersion} = require('./shared/chrome');
const {disableZoom} = require('./shared/disable-zoom');
const {openNewGitHubIssue} = require('./shared/github-issue');
const is = require('./shared/is');
const {platform} = require('./shared/platform');
const {runJS} = require('./shared/run-js');
const openSystemPreferences = require('./shared/system-preferences');
const {openUrlMenuItem} = require('./shared/url-menu-item');

exports.appLaunchTimestamp = appLaunchTimestamp;
exports.chromeVersion = chromeVersion;
exports.disableZoom = disableZoom;
exports.openNewGitHubIssue = openNewGitHubIssue;
exports.is = is;
exports.platform = platform;
exports.runJS = runJS;
exports.openSystemPreferences = openSystemPreferences;
exports.openUrlMenuItem = openUrlMenuItem;
