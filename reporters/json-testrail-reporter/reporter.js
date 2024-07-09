import WDIOReporter from '@wdio/reporter';

export default class CustomJsonReporter extends WDIOReporter {
  static TEST_STATUSES = {
    passed: 1,
    blocked: 2,
    retest: 4,
    failed: 5,
    skipped: 6,
  };

  constructor(options) {
    super(options);
    this.allResults = [];
    this.caseIdPattern = options.caseIdPattern;
  }

  onTestEnd(test) {
    const regExp = new RegExp(this.caseIdPattern);
    if (!regExp.test(test.title)) {
      return;
    }

    this.allResults.push({
      case_id: test.title.split(' ')[0].replace('C', ''),
      status_id: CustomJsonReporter.TEST_STATUSES[test.state],
      comment: test.errors ? test.errors[0].message : '',
    });
  }

  onSuiteEnd(suiteStats) {
    this.write(JSON.stringify(this.allResults));
  }
}
