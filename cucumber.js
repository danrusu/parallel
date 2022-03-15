const cliTokens = [
  '--require src/stepDefinitions/**/*.js',
  '--format json:./reports/cucumber_report.json',
  '--publish-quiet',
];

const features = process.env['FEATURES']
  ? `${process.env['FEATURES']}`
  : 'src/features';

cliTokens.push(features);

console.log(cliTokens);

module.exports = {
  default: cliTokens.join(' '),
};
