// run with node --experimental-worker index.js on Node.js 10.x
const { Worker } = require('worker_threads');

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/cucumber-worker/cucumber-service.js', {
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

  const result1Promise = runService('');
  const result2Promise = runService('src/features/f1.feature');
  const result3Promise = runService('src/features/f2.feature');
  const result4Promise = runService('src/features/f4.feature');
  const result5Promise = runService('src/features/f5.feature');

  const results = await Promise.all([
    result1Promise,
    result2Promise,
    result3Promise,
    result4Promise,
    result5Promise,
  ]);

  console.log('______________________________');
  console.log(results);

  const durationInSeconds = (new Date().getTime() - startTime) / 1000;
  console.log(`durationInSeconds: ${durationInSeconds}`);
}

run().catch(err => console.error(err));
