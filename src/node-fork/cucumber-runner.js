const { spawn } = require('child_process');
const fs = require('fs');

const prettify = json => JSON.stringify(json, null, 2);

const spawnCucumberProcess = ({ feature, cliArgs = [], env }) => {
  const cucumberProcess = spawn(
    'node',
    ['node_modules/@cucumber/cucumber/bin/cucumber-js', feature, ...cliArgs],
    {
      env,
    }
  );
  const testName = env.TEST_NAME;
  writeToLogFile(testName)(prettify(cucumberProcess.spawnargs));
  cucumberProcess.stdout.on('data', writeToLogFile(testName));
  cucumberProcess.stderr.on('data', writeToLogFile(testName));

  return cucumberProcess;
};

const writeToLogFile = testName => data => {
  fs.writeFile(`log/${testName}.log`, data, { flag: 'a' }, err => {
    if (err) {
      throw err;
    }
  });
};

const waitForExitCode = process =>
  new Promise(resolve => {
    process.on('exit', resolve);
  });

(async () => {
  const startTime = new Date().getTime();

  const cucumberRunnerConfig = require('../../cucumber-runner-config.json');

  const cucumberProcesses = cucumberRunnerConfig
    .reduce((processes, config) => {
      const currentProcess = spawnCucumberProcess(config);
      processes.push(currentProcess);
      return processes;
    }, [])
    .map(waitForExitCode);

  const exitCodes = await Promise.all(cucumberProcesses);

  const durationInSeconds = (new Date().getTime() - startTime) / 1000;
  console.log({ exitCodes, durationInSeconds });
})();
