const dataArray = Array.from({ length: 1000000 }, () => Math.random() * 100);
function calculateWithoutWorker() {
    const startTime = performance.now();
    const sortedData = dataArray.slice().sort((a, b) => a - b);
    const endTime = performance.now();
    console.log('Sorting without Web Worker:', sortedData);
    console.log('Time taken:', endTime - startTime, 'ms');
    displayResults(sortedData, endTime - startTime);
}
function calculateWithWorker() {
    const startTime = performance.now();
    const worker = new Worker('web-workers.js');
    worker.postMessage(dataArray);
    worker.onmessage = function (event) {
        const sortedData = event.data;
        const endTime = performance.now();
        console.log('Sorting with Web Worker:', sortedData);
        console.log('Time taken:', endTime - startTime, 'ms');
        worker.terminate();
    };
}
function displayResults(data, timeTaken) {
    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.innerHTML = `
        <p>Sorted Data: ${JSON.stringify(data)}</p>
        <p>Time Taken: ${timeTaken} ms</p>
    `;
}
