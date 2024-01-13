window.electronAPI.handlePlatformTestResult(
	// eslint-disable-next-line max-params
	(_event, testName, actual, expect, result) => {
		console.log(testName, actual, expect, result);

		const resultElement = document.querySelector(
			`#test-platform-${testName} .result`,
		);

		resultElement.innerHTML = `expected ${expect}, got ${actual}`;
		resultElement.classList.add(result ? 'success' : 'error');
	},
);
