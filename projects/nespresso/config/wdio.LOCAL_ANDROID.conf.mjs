import { join } from 'path';
import {config} from './wdio.shared.LOCAL_APPIUM.conf.mjs';
import { urls } from '../constants/urls.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
import fs from 'fs';
import { ARGSUITES } from '../../../support/argsuites.js';

// Read the customTag & desiredUDID from command-line arguments
process.env['CUSTOM_TAG'] = process.argv.includes('--customTag') ? process.argv[process.argv.indexOf('--customTag') + 1] : '';
process.env['DESIRED_UDID'] = process.argv.includes('--desiredUDID') ? process.argv[process.argv.indexOf('--desiredUDID') + 1] : '';

const customTag = process.env.CUSTOM_TAG;
const desiredUDID = process.env.DESIRED_UDID;

console.log('customTag:', customTag);
console.log('desiredUDID:', desiredUDID);

let capabilitiesJson;
// Reading the Device Capability JSON file
if (process.env.TEST_ENVIRONMENT === 'live') {
  capabilitiesJson = JSON.parse(fs.readFileSync('./projects/nespresso/capabilities/androidDeviceCapabilitiesLIVE.json'));
} else {
  capabilitiesJson = JSON.parse(fs.readFileSync('./projects/nespresso/capabilities/androidEmulatorCapabilities.json'));
}
// Setting the app package and activity from here
capabilitiesJson.forEach((obj) => {
  obj['appium:app'] = join(process.cwd(), urls[process.env.TEST_ENVIRONMENT].apkPath);
  obj['appium:appActivity'] = 'com.nespresso.ui.activity.LaunchActivity';
});

// This section will check if the @single-device tag is available and the relevant suite is available to do the single device run filteration.
if (customTag === '@single-device' && ARGSUITES.includes('Single_Device_Tests')) {
  config.jasmineOpts = config.jasmineOpts || {};
  config.jasmineOpts.grep = '@single-device';

  for (const key in capabilitiesJson) {
    capabilitiesJson = capabilitiesJson.filter(function (value) {
      return value['appium:udid'] === desiredUDID;
    });
  }
}

console.log(capabilitiesJson);

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [...capabilitiesJson];

export { config };
