import {type Session, app, session} from 'electron';

export type SetContentSecurityPolicyOptions = {
	/**
	The session to apply the policy to.

	Default: [`electron.session.defaultSession`](https://electronjs.org/docs/api/session#sessiondefaultsession)
	*/
	readonly session?: Session;
};

/**
Set a [Content Security Policy](https://developers.google.com/web/fundamentals/security/csp/) for your app.
Don't forget to [validate the policy](https://csp-evaluator.withgoogle.com) after changes.

@param policy - You can put rules on separate lines, but lines must end in a semicolon.

@example
```
import setContentSecurityPolicy from 'electron-util';

setContentSecurityPolicy(`
	default-src 'none';
	script-src 'self';
	img-src 'self' data:;
	style-src 'self';
	font-src 'self';
	connect-src 'self' https://api.example.com;
	base-uri 'none';
	form-action 'none';
	frame-ancestors 'none';
`);
*/
export const setContentSecurityPolicy = async (
	policy: string,
	options?: SetContentSecurityPolicyOptions,
) => {
	await app.whenReady();

	if (
		!policy
			.split('\n')
			.filter(line => line.trim())
			.every(line => line.endsWith(';'))
	) {
		throw new Error('Each line must end in a semicolon');
	}

	policy = policy.replace(/[\t\n]/g, '').trim();

	options = {
		session: session.defaultSession,
		...options,
	};

	options.session!.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Content-Security-Policy': [policy],
			},
		});
	});
};
