'use strict';

const {shell} = require('electron');
const newGithubIssueUrl = require('new-github-issue-url');

exports.openNewGitHubIssue = options => {
	const url = newGithubIssueUrl(options);
	shell.openExternal(url);
};
