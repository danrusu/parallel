const cliTokens = [
  '--require src/stepDefinitions/**/*.ts',
  `--format json:./reports/cucumber_report_${process.env.TEST_NAME}.json`,
  '--publish-quiet',
];

console.log(`\ncucumber.js CLI: ${JSON.stringify(cliTokens)}`);

module.exports = {
  default: cliTokens.join(' '),
};
