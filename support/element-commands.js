/**
 * This module adds custom methods to element instance. e.g: $('#someId').customMethod()
 *
 * NB!!! Do not use arrow function expressions or it won't work.
 */
export default {
  waitAndClick: async function (timeout) {
    await this.waitForClickable({ timeout });
    await this.waitForDisplayed({ timeout });
    await this.click();
  },
  scrollAndClick: async function (xCoords = 0, yCoords = 0) {
    await this.scrollIntoView();
    await this.click({ x: xCoords, y: yCoords });
  },
  waitAndSetValue: async function (timeout, value) {
    await this.waitForDisplayed({ timeout });
    await this.scrollIntoView();
    await this.setValue(value);
  },
  waitForAnimation: async function (wait = 150) {
    await this.waitForExist(15000);
    let animating = true;

    let preLoc = await this.getLocation();

    while (animating) {
      await browser.pause(wait);
      let postLoc = await this.getLocation();

      if (preLoc.x == postLoc.x && preLoc.y == postLoc.y) {
        animating = false;
      }
      let spread = [postLoc.x - preLoc.x, postLoc.y - preLoc.y];
      console.log(`WaitForAnimation: Spread x: ${spread[0]}; Spread y: ${spread[1]}`);

      preLoc = postLoc;
    }
  },
};
