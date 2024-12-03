const ipc = require('electron').ipcRenderer;

const StringLiterals = require('./lib/stringLiterals');
const I18NUtils = require('./lib/i18nUtils');

const title = document.querySelector('#title');
const dropDown = document.querySelector('#dropdown');
const dropDownRadioButton = document.querySelector('#dropdown_radio_button');
const textRadioButton = document.querySelector('#text_radio_button');
const textBox = document.querySelector('#textbox');
const ok = document.querySelector('#ok');
const cancel = document.querySelector('#cancel');

ipc.on(StringLiterals.VARIABLE_WINDOW_CHANNEL, (event, options) => {
    title.innerText = options.prompt;

    if (options.variableNames.length > 0) {
        dropDown.style.display = StringLiterals.INLINE;
    }

    options
        .variableNames
        .sort((a, b) => I18NUtils.localeCompare(a, b, false))
        .forEach(element => {
        const option = document.createElement(StringLiterals.OPTION);
        option.value = option.text = element;

        dropDown.add(option);
    });

    if (options.displayTextBox) {
        textBox.style.display = StringLiterals.INLINE;

        if (options.variableNames.length > 0) {
            dropDownRadioButton.style.display = StringLiterals.INLINE;
            textRadioButton.style.display = StringLiterals.INLINE;

            dropDown.focus();
        } else {
            textBox.focus();
        }
    } else {
        dropDown.focus();
    }

    if (options.variableNames.length === 0) {
        textRadioButton.checked = StringLiterals.CHECKED;
    }

    wireUpUI();
});

function wireUpUI() {
    function submit() {
        if (!ok.disabled) {
            let variableName;

            const checkedRadioButton = document.querySelector('input[name=radio_button_group]:checked').value;

            if (checkedRadioButton === 'dropdown') {
                variableName = dropDown.value;
            } else {
                variableName = textBox.value;
            }

            if (variableName) {
                ipc.invoke(StringLiterals.RELAY_TO_RENDERER, undefined, StringLiterals.MAIN_WINDOW_CHANNEL, variableName).then();
                window.close();
            }
        }
    }

    ok.addEventListener(StringLiterals.CLICK, () => {
        submit();
    });

    cancel.addEventListener(StringLiterals.CLICK, () => {
        window.close();
    });

    dropDownRadioButton.addEventListener(StringLiterals.CHANGE, () => {
        enableDisableUI();
    });

    textRadioButton.addEventListener(StringLiterals.CHANGE, () => {
       enableDisableUI();
    });

    textBox.addEventListener(StringLiterals.KEYUP, () => {
       enableDisableUI();
    });

    enableDisableUI();

    document.addEventListener(StringLiterals.KEYDOWN, (event) => {
       if (event.key === StringLiterals.ESCAPE) {
           window.close();
       } else if (event.key === StringLiterals.ENTER) {
           submit();
       }
    });
}

function enableDisableUI() {
    if (dropDownRadioButton.style.display === StringLiterals.INLINE) {
        // Radio buttons
        ok.disabled = (dropDownRadioButton.checked && !dropDown.value) || (textRadioButton.checked && !textBox.value);
    } else {
        // No radio buttons
        ok.disabled =
            (textBox.style.display === StringLiterals.INLINE && !textBox.value) ||
            (dropDown.style.display === StringLiterals.INLINE && !dropDown.value);
    }
}