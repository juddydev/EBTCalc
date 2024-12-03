const {checkVersion} = require('../lib/checkVersion');
const StringLiterals = require('../lib/stringLiterals');

try {
    checkVersion(noop, notEquals, noop);
} catch (err) {
    console.error(`checkVersion: ${err}`);
}

function noop() {
}

function notEquals() {
    console.log(`${StringLiterals.NOT_EQUAL}`);
}
