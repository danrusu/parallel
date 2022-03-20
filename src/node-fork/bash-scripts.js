var spawn = require('child_process').spawn;
var process1 = spawn('sh', ['sh_scripts/first.sh', 'Hello', 'John', 'Doe']);
var process2 = spawn('sh', ['sh_scripts/second.sh', 'Test', 'automation']);

let error = [];
let output = [];

const errorHandler = data => error.push(data);
const outputHandler = data => output.push(data);

process1.stderr.on('data', errorHandler);
process1.stdout.on('data', outputHandler);

process2.stderr.on('data', errorHandler);
process2.stdout.on('data', outputHandler);

const waitFor = process =>
  new Promise(res => {
    process.on('exit', res);
  });

(async () => {
  //await waitFor(process1);
  await waitFor(process2);
  console.log(`Output: ${output}`);
  if (error.length > 0) {
    console.log(`Error: ${error}`);
  }
})();
