
import allureReporter from '@wdio/allure-reporter';

describe('On nespresso login page', () => {

  beforeEach(async () => {
    await browser.launchApp();
  });

  it('Launch Nespresso APP', async () => {
    allureReporter.addTestId('SMF-997');
  });

  afterEach(async () => {
    await browser.closeApp();
  });
});
