const { exit } = require('process');
const { workerData, parentPort } = require('worker_threads');
const {
  default: cucumberRunner,
} = require('../../node_modules/@cucumber/cucumber/lib/cli/run');

(async () => {
  console.log(`Worker cli: ${process.argv}`);

  process.env['FEATURES'] = workerData;
  // uses cucumber.js which will append features to the CLI from  process.env['FEATURES']
  try {
    await cucumberRunner();
    parentPort.postMessage(`cucumber | ${workerData} | FINISHED`);
  } catch (err) {
    parentPort.postMessage(`cucumber | ${workerData} | FAILED: ${err}`);
  }
})();
