import { fixture } from 'testcafe';

fixture`Fixture import`.page('http://www.qatools.ro');

test('Click a button', async t => {
  await t.click('[href="calculate/appApi.html"]');
});
