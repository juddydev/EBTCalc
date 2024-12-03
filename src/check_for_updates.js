const {shell} = require('electron');
const {config} = require('./package.json');
const AppInfo = require('./lib/appInfo');
const {checkVersion} = require('./lib/checkVersion');

const StringLiterals = require('./lib/stringLiterals');

const closeButton = document.querySelector('#close');
const downloadButton = document.querySelector('#download');

const currentVersion = document.querySelector('#current_version');
const obsoleteVersion = document.querySelector('#obsolete_version');

wireUpUI();

function wireUpUI() {
    document.querySelector('#app_and_version').innerText = `${AppInfo.getInfo.name} version ${AppInfo.getInfo.version}`;

    closeButton.addEventListener(StringLiterals.CLICK, () => {
        window.close();
    });

    document.addEventListener(StringLiterals.KEYDOWN, (event) => {
        if (event.key === StringLiterals.ESCAPE) {
            window.close();
        }
    });

    document.querySelector('#donate').addEventListener(StringLiterals.CLICK, () => {
        shell.openExternal(config.donateUrl).then();
    });

    downloadButton.addEventListener(StringLiterals.CLICK, () => {
        shell.openExternal(config.downloadUrl).then();
    });

    checkVersion(errorCallback, notEqualsCallback, equalsCallback);
}

function errorCallback() {
    notEqualsCallback();
}

function notEqualsCallback() {
    obsoleteVersion.style.display = 'block';

    downloadButton.disabled = false;
}

function equalsCallback() {
    currentVersion.style.display = 'block';
}
