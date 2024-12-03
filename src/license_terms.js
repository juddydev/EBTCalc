const StringLiterals = require('./lib/stringLiterals');
const {ipcRenderer} = require('electron');

const okButton = document.querySelector('#ok');
let preventWindowClose = true;

wireUpUI();

function wireUpUI() {
    this.window.onbeforeunload = () => {
        if (preventWindowClose) {
            rejectOrAcceptTerms();

            window.close();
        }
    };

    okButton.addEventListener(StringLiterals.CLICK, () => {
        rejectOrAcceptTerms();

        preventWindowClose = false;
        window.close();
    });
}

function rejectOrAcceptTerms() {
    const checkedRadioButton = document.querySelector('input[name=radio_button_group]:checked').value;

    if (checkedRadioButton === 'reject') {
        ipcRenderer.invoke(StringLiterals.REJECT_LICENSE_TERMS).then();
    } else {
        ipcRenderer.invoke(StringLiterals.ACCEPT_LICENSE_TERMS).then();
    }
}