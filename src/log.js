const StringLiterals = require('./lib/stringLiterals');
const StringUtils = require('./lib/stringUtils');

const logMessagesText = document.querySelector('#log_messages_text');

require('electron').ipcRenderer.on('log-message', (event, message) => {
    message = message.toString();

    const index = message.indexOf(StringLiterals.USER_LOG_MESSAGE_DELIMITER);

    if (index !== -1) {
        const lines = extractLogLines(message, index);

        if (logMessagesText.innerText) {
            logMessagesText.innerText += StringLiterals.NEWLINE;
        }

        logMessagesText.innerText = `${logMessagesText.innerText}${lines.join('\n')}`;

        logMessagesText.scrollTop = logMessagesText.scrollHeight;
    }
});

function extractLogLines(message, index) {
    message = message.slice(index);

    const lastIndex = StringUtils.lastIndexOf(message, StringLiterals.USER_LOG_MESSAGE_DELIMITER);

    if (lastIndex !== -1) {
        message = message.slice(0, lastIndex + StringLiterals.USER_LOG_MESSAGE_DELIMITER.length);
    }

    return message
        .split(StringLiterals.USER_LOG_MESSAGE_DELIMITER)
        .filter(line => line.length > 0);
}

document.querySelector('#close').addEventListener(StringLiterals.CLICK, () => {
    window.close();
});

document.querySelector('#clear').addEventListener(StringLiterals.CLICK, () => {
    logMessagesText.innerText = StringLiterals.EMPTY_STRING;
});

document.addEventListener(StringLiterals.KEYDOWN, (event) => {
    if (event.key === StringLiterals.ESCAPE) {
        window.close();
    }
});
