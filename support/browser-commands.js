/**
 * This module adds custom methods to `browser` scope. e.g browser.customMethod()
 *
 * NB!!! Do not use arrow function expressions or it won't work.
 */
export default {
  jsClick: async function (element) {
    await this.execute('arguments[0].click();', element);
  },

  waitForPage: async function () {
    await this.waitUntil(() => this.execute(() => document.readyState === 'complete'), {
      timeout: 60 * 1000,
      timeoutMsg: 'Timeout on page loading',
    });
  },

  waitForDropDownOptions: async function (element) {
    await browser.waitUntil(
      async () => (
        (await element.$$('option')).length > 0,
        {
          timeout: 15000,
          timeoutMsg: 'Data did not appear for popup',
        }
      ),
    );
  },

  waitForNewBrowserTab: async function () {
    await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1, {
      timeout: 15000,
      timeoutMsg: 'New browser tab has not loaded after 15 seconds',
    });
  },

  switchToBrowserTab: async function (tab) {
    await browser.waitUntil(
      async () => {
        let handles = await browser.getWindowHandles();
        if (handles.length > tab) {
          this.switchToWindow(handles[tab]);
          return true;
        }
        return false;
      },
      {
        timeout: 15000,
        timeoutMsg: 'Could not switch tabs after 15 seconds',
      },
    );
  },

  closeBrowserTab: async function (tab) {
    await browser.waitUntil(
      async () => {
        let handles = await this.getWindowHandles();
        if (handles.length > tab) {
          await this.switchToWindow(handles[tab]);
          await this.closeWindow();
          if (tab > 0) {
            await this.switchToWindow(handles[tab - 1]);
          }
          return true;
        }
        return false;
      },
      {
        timeout: 15000,
        timeoutMsg: 'Could not close a tab after 15 seconds',
      },
    );
  },

  getElementByExactText: async function (element, text) {
    return await $(`${element}=${text}`);
  },

  getElementByStartsWithText: async function (element, text) {
    return await $(`${element}^=${text}`);
  },

  getElementThatContainsText: async function (element, text) {
    return await $(`${element}^=${text}`);
  },

  scrollDownByPixels: async function (pixels) {
    await this.execute(`window.scrollBy(0,${pixels})`);
  },
};
