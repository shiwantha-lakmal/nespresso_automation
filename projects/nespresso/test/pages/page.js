import allureReporter from '@wdio/allure-reporter';
import { utcTimestamp } from '../../../../support/helpers/utils';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

export default class Page {
  /**
   * Opens page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  async open() {
    await allureReporter.startStep(utcTimestamp() + `Opening up the Flutter Application`);
    await browser.launchApp();
    await allureReporter.endStep('passed');
  }

  async navigateTo(url) {
    await browser.navigateTo(url);
  }

  async waitForPage() {
    await allureReporter.startStep(utcTimestamp() + 'Wait for page to load');
    await browser.waitForPage();
    await allureReporter.endStep('passed');
  }

  async scrollDownToTheYCoordinate(startPercentage, endPercentage) {
    await browser.pause(2000);
    const { width, height } = await driver.getWindowSize();

    const startY = height * startPercentage;
    const endY = height * endPercentage;

    const actions = [
      {
        action: 'press',
        options: { x: width / 2, y: startY },
      },
      {
        action: 'wait',
        options: { ms: 1000 },
      },
      {
        action: 'moveTo',
        options: { x: width / 2, y: endY },
      },
      {
        action: 'release',
      },
    ];

    await browser.touchPerform(actions);
  }

  async switchTheContext(contextType) {
    await allureReporter.startStep(utcTimestamp() + 'Switching the context to ' + contextType);
    await browser.pause(3000);
    let contexts = await browser.getContexts();
    console.log('Available Contexts: ' + contexts);
    await browser.switchContext(contextType);
    await browser.pause(5000);
    await allureReporter.endStep('passed');
  }

  async checkAndHideKeyboardIfVisible() {
    if (browser.isKeyboardShown()) {
      await browser.hideKeyboard();
    }
  }

  async switchToCurrentlyActiveMobileBrowserWindow() {
    // Get the list of window handles
    const handles = await browser.getWindowHandles();
    // Switch to the last handle in the list (which should be the currently active tab)
    await browser.switchToWindow(handles[handles.length - 1]);
  }

  async scrollHorizontallyToTheXCoordinate(startPercentage, endPercentage) {
    await browser.pause(2000);
    const { width, height } = await driver.getWindowSize();

    const startX = width * startPercentage;
    const endX = width * endPercentage;

    const actions = [
      {
        action: 'press',
        options: { x: startX, y: height / 2 },
      },
      {
        action: 'wait',
        options: { ms: 1000 },
      },
      {
        action: 'moveTo',
        options: { x: endX, y: height / 2 },
      },
      {
        action: 'release',
      },
    ];

    await browser.touchPerform(actions);
  }

  // eslint-disable-next-line no-dupe-class-members
  async scrollHorizontallyToTheXCoordinate(startPercentage, endPercentage, yAxis) {
    await browser.pause(2000);
    const { width, height } = await driver.getWindowSize();
    console.log(height);

    const startX = width * startPercentage;
    const endX = width * endPercentage;

    const actions = [
      {
        action: 'press',
        options: { x: startX, y: yAxis },
      },
      {
        action: 'wait',
        options: { ms: 1000 },
      },
      {
        action: 'moveTo',
        options: { x: endX, y: yAxis },
      },
      {
        action: 'release',
      },
    ];

    await browser.touchPerform(actions);
  }

  async touchGivenPointOnTheScreen(xPercentage, yPercentage) {
    const { width, height } = await driver.getWindowSize();

    const yPoint = height * yPercentage;
    const xPoint = width * xPercentage;

    await browser.touchAction({
      action: 'tap',
      x: xPoint,
      y: yPoint,
    });
  }

  async swipeDownToTheYCoordinateFromGivenElement(sourceElement, endPercentage) {
    await browser.pause(2000);
    const { width, height } = await driver.getWindowSize();

    const endY = height * endPercentage;

    const actions = [
      {
        action: 'press',
        options: { element: sourceElement },
      },
      {
        action: 'wait',
        options: { ms: 1000 },
      },
      {
        action: 'swipe',
        options: { direction: 'down', x: width / 2, y: endY },
      },
      {
        action: 'release',
      },
    ];

    await browser.touchPerform(actions);
  }

  async getTheClipboardCopiedURL() {
    await allureReporter.startStep('Returning the retrieved value from Clipboard');
    let textValue = await browser.getClipboard('URL');
    // Decode the Base64 string
    let urlValue = Buffer.from(textValue, 'base64').toString('utf-8');
    console.log('URL VALUE: ' + urlValue);
    await allureReporter.endStep('passed');
    return urlValue.toString();
  }

  async openGivenDeepLinkInApp(link) {
    await allureReporter.startStep('Opening a given deep link');
    await browser.execute('mobile:deepLink', {
      url: link.toString(),
      package: 'app.package',
    });
    await allureReporter.endStep('passed');
  }
}
