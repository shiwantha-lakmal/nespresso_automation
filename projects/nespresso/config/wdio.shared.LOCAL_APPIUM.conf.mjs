import { sharedConfig } from './wdio.shared.conf.mjs';

//
// ======
// Appium
// ======
//
sharedConfig.services = (sharedConfig.services ? sharedConfig.services : []).concat([
  [
    'appium',
    {
      // This will use the globally installed version of Appium
      command: 'appium',
      args: {
        // This is needed to tell Appium that we can execute local ADB commands
        // and to automatically download the latest version of ChromeDriver
        relaxedSecurity: true,
        allowInsecure: ['chromedriver_autodownload'],
        address: '0.0.0.0',
        // Write the Appium logs to a file in the root of the directory
        log: './appium.log',
      },
    },
  ],
]);

export const config = {
  ...sharedConfig,
  specFileRetries: 0,
  specFileRetriesDelay: 5,
  specFileRetriesDeferred: true,
  capabilities: [],
};
