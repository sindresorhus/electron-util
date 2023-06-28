"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openNewGitHubIssue = void 0;
var electron_1 = require("electron");
var new_github_issue_url_1 = __importDefault(require("new-github-issue-url"));
/**
Opens the new issue view on the given GitHub repo in the browser.
Optionally, with some fields like title and body prefilled.

@param options - The options are passed to the [`new-github-issue-url`](https://github.com/sindresorhus/new-github-issue-url#options) package.

@example
```
import {openNewGitHubIssue} from 'electron-util';

openNewGitHubIssue({
    user: 'sindresorhus',
    repo: 'playground',
    body: 'Hello'
});
*/
var openNewGitHubIssue = function (options) {
    var url = (0, new_github_issue_url_1.default)(options);
    electron_1.shell.openExternal(url);
};
exports.openNewGitHubIssue = openNewGitHubIssue;
