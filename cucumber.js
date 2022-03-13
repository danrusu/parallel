const cliTokens = [
  '--require src/stepDefinitions/**/*.js',
  '--format json:./reports/cucumber_report.json',
  '--publish-quiet',
  'src/features',
];

console.log(cliTokens);

module.exports = {
  default: cliTokens.join(' '),
};
