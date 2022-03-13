const { Given, When, Then } = require('@cucumber/cucumber');

Given('I navigate to {string}', async url => {
  console.log('given');
});

When('I click {string}', async linkText => {
  console.log('when');
});

Then('I can see the {string} page', async pageName => {
  console.log('then');
});
