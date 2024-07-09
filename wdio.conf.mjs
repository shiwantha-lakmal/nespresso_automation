/**
 * This file defines which config file to execute depending on the passed arguments
 * Currently supports chrome and safari. If you want to add more browsers/devices then modify this file
 * and add appropriate configuration file in "config" folder
 */
import { config } from 'dotenv';
import minimist from 'minimist';
import fs from 'fs';
import 'graphql-import-node';
config();

const argv = minimist(process.argv.slice(2));
console.log('argv', argv);

let platform = argv.platform;
if (!platform) {
  console.log(
    'Pass correct platform name as an argument e.g: npm run test -- --platform=DESKTOP_CHROME --project=nespresso --site=nespresso --testEnv=staging\n',
  );
  process.exit(0);
}
const testEnv = argv.testEnv;
if (!testEnv) {
  console.log(
    'Pass correct testEnv name as an argument e.g: npm run test -- --platform=DESKTOP_CHROME --project=nespresso --site=nespresso --testEnv=staging\n',
  );
  process.exit(0);
}
const project = argv.project;
if (!project) {
  console.log(
    'Pass correct project name as an argument e.g: npm run test -- --platform=DESKTOP_CHROME --project=nespresso --testEnv=staging\n',
  );
  process.exit(0);
}
if (!fs.existsSync(`projects/${project}`)) {
  console.log(`"${project}" project doesn\'t exist`);
  process.exit(0);
}

process.env['TEST_ENVIRONMENT'] = testEnv;

let site = argv.site;
process.env['TEST_SITE'] = site;
const testRailEnabled = argv.testrailReport;
if (testRailEnabled === 'true') {
  const testrailProjectId = argv.testrailProjectId;
  if (!testrailProjectId) {
    console.log('You enabled testrail report but did not specified project to report to');
    process.exit(0);
  }

  const testrailPlanId = argv.testrailPlanId;
  if (!testrailPlanId) {
    console.log('You enabled testrail report but did not specified plan to report to');
    process.exit(0);
  }

  process.env['TESTRAIL_GENERATE_REPORT'] = testRailEnabled;
  process.env['TESTRAIL_PROJECT_ID'] = testrailProjectId;
  process.env['TESTRAIL_PLAN_ID'] = testrailPlanId;
}
// const argSuites = argv.suite;
// let suites = [];
// if (Array.isArray(argSuites)) {
//   argSuites.forEach((suite) => suites.push(suite));
// } else {
//   suites.push(argSuites);
// }
//
// export const ARGSUITES = suites;

const configModule = await import(`./projects/${project}/config/wdio.${platform}.conf.mjs`);
export default configModule;
