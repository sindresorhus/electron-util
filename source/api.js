'use strict';
const electron = require('electron');

module.exports = new Proxy(electron, {
	get: (target, property) => target[property] || (target.remote ? target.remote[property] : undefined)
});
