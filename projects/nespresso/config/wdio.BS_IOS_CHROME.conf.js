import { config, USER_AGENT } from './wdio.shared.conf.mjs';

const browserOptions = {
  excludeSwitches: ['enable-automation'],
  args: [
    `--user-agent=${USER_AGENT}`,
    ...(process.argv.includes('--headless') ? ['--headless', '--no-sandbox'] : []),
    ...(process.env.CI ? ['--shm-size=2gb'] : ['--shm-size=1gb']),
  ],
};

const browserConfig = {
  ...config,
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  host: 'hub.browserstack.com',
  services: [['browserstack']],
  capabilities: [
    {
      'bstack:options': {
        osVersion: '15',
        deviceName: 'iPhone 13',
        realMobile: 'true',
        projectName: '',
        appiumVersion: '1.22.0',
        local: process.env.BROWSERSTACK_LOCAL,
        userName: process.env.BROWSERSTACK_USERNAME,
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
        chrome: browserOptions,
      },
      browserName: 'Chrome',
      maxInstances: process.env.CI ? 10 : 5,
      acceptInsecureCerts: true,
    },
  ],
};

exports.config = browserConfig;
