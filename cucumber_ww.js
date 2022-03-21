const cliTokens = [
  '--require src/stepDefinitions/**/*.ts',
  `--format json:./reports/cucumber_report_${process.env.TEST_NAME}.json`,
  '--publish-quiet',
];

const features = process.env['FEATURES']
  ? `${process.env['FEATURES']}`
  : 'src/features'; // all features by default

cliTokens.push(features);

console.log(`\cucumber.js CLI: ${JSON.stringify(cliTokens)}`);

module.exports = {
  default: cliTokens.join(' '),
};
