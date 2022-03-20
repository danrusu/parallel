// const {
//   Given,
//   When,
//   Then,
//   AfterAll,
//   BeforeAll,
// } = require('@cucumber/cucumber');

// const createTestCafe = require('testcafe');

// let testcafe;
// let runner;

// BeforeAll(async () => {
//   testcafe = await createTestCafe('localhost');
//   runner = await testcafe.createRunner();
// });

// AfterAll(async () => {
//   await testcafe.close();
// });

// Given('I navigate to {string}', async url => {
//   console.log('given');
//   await runner.src(['src/tests/fixture1.js']).browsers(['chrome']).run();
// });

// When('I click {string}', async linkText => {
//   console.log('when');
// });

// Then('I can see the {string} page', async pageName => {
//   console.log('then');
// });

// // Given('I can fail', async () => {
// //   throw new Error('TEST FAILURE');
// // });
