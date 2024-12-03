const StringLiterals = require('./lib/stringLiterals');
const Chart = require('chart.js');
const ipc = require('electron').ipcRenderer;

const graph = document.querySelector('#graph');

ipc.on(StringLiterals.CHILD_WINDOW_CHANNEL, (event, whatToGraph) => {
    console.log(`graph.js ipc.on ${whatToGraph}`);

    renderGraph(JSON.parse(whatToGraph));
});

wireUpUI();

function wireUpUI() {
    document.querySelector('#close').addEventListener(StringLiterals.CLICK, () => {
        window.close();
    });

    document.addEventListener(StringLiterals.KEYDOWN, (event) => {
        if (event.key === StringLiterals.ESCAPE) {
            window.close();
        }
    });
}

function renderGraph(whatToGraph) {
    const ctx = graph.getContext('2d');

    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: whatToGraph.type,

        // The data for our dataset
        data: whatToGraph.data,

        // Configuration options go here
        options: whatToGraph.options
    });
}