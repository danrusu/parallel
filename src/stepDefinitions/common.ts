const { Given, When, Then } = require('@cucumber/cucumber');

Given('I navigate to {string}', async url => {
  console.log(`GIVEN`);
});

When('I click {string}', async linkText => {
  console.log(`WHEN`);
});

Then('I can see the {string} page', async pageName => {
  console.log(`THEN`);
});

Given('I fail', async () => {
  throw new Error('TEST FAILURE');
});
