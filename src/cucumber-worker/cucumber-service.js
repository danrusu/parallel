const { workerData, parentPort } = require('worker_threads');
const {
  default: cucumberRunner,
} = require('../../node_modules/@cucumber/cucumber/lib/cli/run');

(async () => {
  process.env['FEATURES'] = workerData;
  await cucumberRunner(); // uses cucumber.js which will append features to the CLI
  parentPort.postMessage(`cucumber | ${workerData} | FINISHED`);
})();
