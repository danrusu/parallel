const { workerData, parentPort } = require('worker_threads');
const fetch = require('isomorphic-fetch');

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
/*
fetch(workerData).then(res => {
  res.text().then(text => {
    parentPort.postMessage({ hello: text });
  });
});
*/

const calculate = count => {
  const x = [];
  for (let i = 0; i < count; i++) {
    x.push(i);
  }
};

(async () => {
  const text = await (await fetch(workerData)).text();
  calculate(10_000_000); // 1-2 seconds of computing
  parentPort.postMessage({ response: text });
})();
