const { spawn } = require('child_process');
const fs = require('fs');

const pretty = json => JSON.stringify(json, null, 2);

const spawnCucumber = ({ feature, cliArgs = [], env }) =>
  spawn(
    'node',
    ['node_modules/@cucumber/cucumber/bin/cucumber-js', feature, ...cliArgs],
    {
      env,
    }
  );

const writeToLogFile = testName => data => {
  fs.writeFile(`log/${testName}.log`, data, { flag: 'a' }, err => {
    if (err) {
      throw err;
    }
  });
};

const cucumberRunnerConfig = require('../../cucumber-runner-config.json');
const cucumberProcesses = [];

cucumberRunnerConfig.forEach(cucumberConfig => {
  const process = spawnCucumber(cucumberConfig);
  const testName = cucumberConfig.env.TEST_NAME;
  cucumberProcesses.push(process);
  writeToLogFile(testName)(pretty(process.spawnargs));
  process.stdout.on('data', writeToLogFile(testName));
  process.stderr.on('data', writeToLogFile(testName));
});

const waitFor = process =>
  new Promise(resolve => {
    process.on('exit', resolve);
  });

(async () => {
  console.log('start');

  const exitCodes = await Promise.all(cucumberProcesses.map(waitFor));

  console.log(`exitCodes: ${exitCodes}`);
})();
