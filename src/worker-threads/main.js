// index.js
// run with node --experimental-worker index.js on Node.js 10.x
const { Worker } = require('worker_threads');
var moment = require('moment');

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/worker-threads/service.js', {
      workerData,
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function run() {
  const startTime = new Date().getTime();

  const serviceUrl = 'https://postman-echo.com/delay/3';
  const nrOfWorkers = 10;

  const resultsPromises = Array.from(
    { length: nrOfWorkers },
    i => serviceUrl
  ).map(runService);

  const results = await Promise.all(resultsPromises);

  console.log(results);

  const durationInSeconds = (new Date().getTime() - startTime) / 1000;
  console.log(`durationInSeconds: ${durationInSeconds}`);
}

run().catch(err => console.error(err));
