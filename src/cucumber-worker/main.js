// run with node --experimental-worker index.js on Node.js 10.x
const { Worker } = require('worker_threads');

const workerErrors = [];

function runService(workerData) {
  return new Promise(resolve => {
    const worker = new Worker('./src/cucumber-worker/cucumber-service.js', {
      workerData,
    });
    worker.on('message', resolve);
    worker.on('error', e =>
      workerErrors.push(`Worker ${worker.threadId}: ${e}`)
    );
    worker.on('exit', code => {
      if (code !== 0)
        workerErrors.push(
          new Error(`Worker ${worker.threadId} exit code: ${code}`)
        );
    });
  });
}

async function run() {
  const startTime = new Date().getTime();

  const result1Promise = runService({
    features: 'src/features/f1.feature',
    reportName: 'f1',
  });
  const result2Promise = runService({
    features: 'src/features/f2.feature',
    reportName: 'f2',
  });
  const result3Promise = runService({
    features: 'src/features/f3.feature',
    reportName: 'f3',
  });

  const results = await Promise.all([
    result1Promise,
    result2Promise,
    result3Promise,
  ]);

  console.log('_____________________________________');
  console.log(results);

  const durationInSeconds = (new Date().getTime() - startTime) / 1000;
  console.log(`durationInSeconds: ${durationInSeconds}`);
}

(async () => {
  await run();
  if (workerErrors.length) {
    console.log(`Worker errors: ${workerErrors}`);
  }
})();
