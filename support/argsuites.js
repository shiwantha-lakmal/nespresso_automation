import minimist from 'minimist';
const argv = minimist(process.argv.slice(2));

export const ARGSUITES = await argv.suite;
let suites = [];
if (Array.isArray(ARGSUITES)) {
  ARGSUITES.forEach((suite) => suites.push(suite));
} else {
  suites.push(ARGSUITES);
}
