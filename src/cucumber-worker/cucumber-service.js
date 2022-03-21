const { workerData, parentPort } = require('worker_threads');
const {
  default: cucumberRunner,
} = require('../../node_modules/@cucumber/cucumber/lib/cli/run');

(async () => {
  console.log(`Worker cli: ${process.argv}`);
  const { features, testName } = workerData;

  process.env.FEATURES = features;
  process.env.TEST_NAME = testName;

  // uses cucumber.js which will append features to the CLI from process.env.FEATURES
  try {
    await cucumberRunner();
    parentPort.postMessage(
      `cucumber | ${JSON.stringify(workerData)} | FINISHED`
    );
  } catch (err) {
    parentPort.postMessage(
      `cucumber | ${JSON.stringify(workerData)} | FAILED: ${err}`
    );
  }
})();
