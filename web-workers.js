self.onmessage = function (event) {
    const data = event.data;
    const sortedData = data.slice().sort((a, b) => a - b);
    self.postMessage(sortedData);
};
