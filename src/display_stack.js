const ipc = require('electron').ipcRenderer;
const StringLiterals = require('./lib/stringLiterals.js');
const remote = require('@electron/remote');
const { Menu, MenuItem } = remote;

const closeButton = document.querySelector('#close');
const stackList = document.querySelector('#stack_list');

ipc.on(StringLiterals.CHILD_WINDOW_CHANNEL, (event, stackItems) => {
    wireUpUI(stackItems);
});

function wireUpUI(stackItems) {
    console.log(`display_stack: stackValues: ${JSON.stringify(stackItems)}`);

    stackItems.forEach(element => {
        const newListItem = document.createElement(StringLiterals.LI);
        newListItem.className = StringLiterals.STACK_ITEM;

        const preItem = document.createElement(StringLiterals.PRE);

        const textNode = document.createTextNode(element);
        preItem.appendChild(textNode);
        newListItem.appendChild(preItem);
        stackList.appendChild(newListItem);

        preItem.addEventListener(StringLiterals.CONTEXTMENU, (event) => {
            const menu = new Menu();

            menu.append(new MenuItem({ role: 'selectAll' }));
            menu.append(new MenuItem({ role: 'copy' }));

            if (!this.contextMenuActive) {
                event.preventDefault();

                menu.popup();
            }
        }, false);
    });

    closeButton.addEventListener(StringLiterals.CLICK, () => {
        window.close();
    });

    document.addEventListener(StringLiterals.KEYDOWN, (event) => {
        if (event.key === StringLiterals.ESCAPE) {
            window.close();
        }
    });
}