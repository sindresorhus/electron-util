import {shell} from 'electron';
import newGithubIssueUrl, {
	type Options as OpenNewGitHubIssueOptions,
} from 'new-github-issue-url';

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
export const openNewGitHubIssue = (options: OpenNewGitHubIssueOptions) => {
	const url = newGithubIssueUrl(options);
	void shell.openExternal(url);
};
