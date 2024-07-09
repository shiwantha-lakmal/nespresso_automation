import { config, USER_AGENT } from './wdio.shared.conf.mjs';

const browserConfig = {
  ...config,
  specFileRetries: process.env.CI ? 1 : 0,
  specFileRetriesDelay: 5,
  specFileRetriesDeferred: true,
  hostname: 'selenium-router',
  port: 4444,
  path: '/',
  services: [],
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          `--user-agent=${USER_AGENT}`,
          '--no-sandbox',
          '--disable-infobars',
          '--window-size=1440,735',
          '--shm-size=3gb',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--headless',
        ],
      },
      maxInstances: 9,
      acceptInsecureCerts: true,
    },
  ],
};

exports.config = browserConfig;
